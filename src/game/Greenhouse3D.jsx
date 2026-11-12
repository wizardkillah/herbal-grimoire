import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const tables=[[-3,0],[3,0],[0,-3]];
export default function Greenhouse3D({plots,onStation}) {
  const host=useRef(null),navigation=useRef(null),callback=useRef(onStation),currentPlots=useRef(plots);
  const [error,setError]=useState('');callback.current=onStation;currentPlots.current=plots;
  useEffect(()=>{
    let renderer,raf=0,observer;const resources=[],keys=new Set(),container=host.current;
    const disposable=x=>(resources.push(x),x);
    try {
      renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
      renderer.setClearColor('#b6b499');container.appendChild(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Invernadero 3D. Usa WASD para caminar, flechas izquierda y derecha para mirar, o las estaciones de abajo.');
      const scene=new THREE.Scene();scene.fog=new THREE.Fog('#b6b499',12,30);
      const camera=new THREE.PerspectiveCamera(65,1,.1,45);camera.position.set(0,1.65,5.7);let yaw=0;
      scene.add(new THREE.HemisphereLight('#ffe5b0','#23382b',2));const sun=new THREE.DirectionalLight('#ffce87',2.5);sun.position.set(-8,5,3);scene.add(sun);
      const mat=color=>disposable(new THREE.MeshLambertMaterial({color}));
      const frame=mat('#244435'),wood=mat('#735840'),floor=mat('#ae9671'),clay=mat('#bb754c');
      const cube=disposable(new THREE.BoxGeometry(1,1,1));
      const box=(x,y,z,sx,sy,sz,material)=>{const mesh=new THREE.Mesh(cube,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);scene.add(mesh);return mesh;};
      box(0,-.1,0,14,.2,12,floor);
      for(const x of [-7,7])for(const z of [-6,-3,0,3,6])box(x,2,z,.12,4,.12,frame);
      for(const z of [-6,6])for(const x of [-7,-3.5,0,3.5,7])box(x,2,z,.12,4,.12,frame);
      for(const z of [-6,0,6])box(0,4,z,14,.14,.14,frame);
      for(const x of [-7,0,7])box(x,4,0,.12,.12,12,frame);
      const glass=disposable(new THREE.MeshLambertMaterial({color:'#e6d8b9',transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false}));
      box(-7,2,0,.03,4,12,glass);box(7,2,0,.03,4,12,glass);box(0,2,-6,14,4,.03,glass);box(0,4.1,0,14,.03,12,glass);
      const pickables=[];
      tables.forEach(([x,z],i)=>{const table=box(x,.85,z,2.4,.18,1.4,wood);table.userData.station=i;pickables.push(table);for(const dx of [-.9,.9])for(const dz of [-.5,.5])box(x+dx,.4,z+dz,.12,.8,.12,frame);});
      const potGeometry=disposable(new THREE.CylinderGeometry(.24,.17,.37,8));
      const pots=new THREE.InstancedMesh(potGeometry,clay,12),matrix=new THREE.Matrix4();
      tables.forEach(([x,z],i)=>{for(let k=0;k<4;k++)pots.setMatrixAt(i*4+k,matrix.makeTranslation(x+(k%2? .6:-.6),1.13,z+(k<2?-.32:.32)));});scene.add(pots);resources.push(pots);
      const atlas=document.createElement('canvas');atlas.width=256;atlas.height=128;const ctx=atlas.getContext('2d');ctx.strokeStyle='#b4cc80';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(128,125);ctx.lineTo(128,20);ctx.stroke();ctx.fillStyle='#70974e';for(const [x,y,r] of [[106,76,-.5],[149,50,.5],[109,27,-.4]]){ctx.beginPath();ctx.ellipse(x,y,28,12,r,0,Math.PI*2);ctx.fill();}
      const texture=disposable(new THREE.CanvasTexture(atlas));texture.colorSpace=THREE.SRGBColorSpace;
      const plantMat=disposable(new THREE.MeshLambertMaterial({map:texture,transparent:true,alphaTest:.2,side:THREE.DoubleSide})),plane=disposable(new THREE.PlaneGeometry(1.1,.9));
      const plants=tables.map(([x,z],i)=>{const p=new THREE.Mesh(plane,plantMat);p.position.set(x,1.6,z);scene.add(p);return p;});
      const compost=box(-5, .6,-4,1.3,1.2,1.1,wood);compost.userData.station='compost';pickables.push(compost);
      const shelf=box(5,1,-4,2,2,.45,frame);shelf.userData.station='basket';pickables.push(shelf);
      const bottleGeo=disposable(new THREE.CylinderGeometry(.12,.12,.4,6)),bottleMat=mat('#b2b78a'),bottles=new THREE.InstancedMesh(bottleGeo,bottleMat,8);for(let i=0;i<8;i++)bottles.setMatrixAt(i,matrix.makeTranslation(4.3+(i%4)*.45,.6+Math.floor(i/4)*.9,-3.7));scene.add(bottles);resources.push(bottles);
      const blocked=(x,z)=>Math.abs(x)>6.65||Math.abs(z)>5.65||tables.some(([tx,tz])=>Math.abs(x-tx)<1.45&&Math.abs(z-tz)<.95);
      navigation.current={hold:key=>keys.add(key),release:key=>keys.delete(key),station:id=>{keys.clear();if(typeof id==='number'){camera.position.set(tables[id][0],1.65,tables[id][1]+2);yaw=0;}callback.current(id);}};
      const keydown=e=>{if(['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){keys.add(e.key);e.preventDefault();}},keyup=e=>keys.delete(e.key),clear=()=>keys.clear();
      renderer.domElement.addEventListener('keydown',keydown);renderer.domElement.addEventListener('keyup',keyup);renderer.domElement.addEventListener('blur',clear);window.addEventListener('blur',clear);document.addEventListener('visibilitychange',clear);
      const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let drag=null;
      const down=e=>{drag={x:e.clientX,y:e.clientY,start:e.clientX};renderer.domElement.setPointerCapture(e.pointerId);renderer.domElement.focus();};
      const move=e=>{if(drag){yaw-=(e.clientX-drag.x)*.005;drag.x=e.clientX;}};
      const up=e=>{if(drag&&Math.abs(e.clientX-drag.start)<5){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickables)[0];if(hit)callback.current(hit.object.userData.station);}drag=null;};
      renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',()=>{drag=null;keys.clear();});
      observer=new ResizeObserver(()=>{const width=container.clientWidth,height=container.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();});observer.observe(container);
      let last=performance.now();const render=now=>{raf=requestAnimationFrame(render);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;
        if(keys.has('ArrowLeft'))yaw+=dt*1.5;if(keys.has('ArrowRight'))yaw-=dt*1.5;
        const forward=(keys.has('w')||keys.has('ArrowUp')?1:0)-(keys.has('s')||keys.has('ArrowDown')?1:0),side=(keys.has('d')?1:0)-(keys.has('a')?1:0),length=Math.hypot(forward,side)||1;
        const dx=(-Math.sin(yaw)*forward+Math.cos(yaw)*side)*dt*2.5/length,dz=(-Math.cos(yaw)*forward-Math.sin(yaw)*side)*dt*2.5/length;
        if(!blocked(camera.position.x+dx,camera.position.z))camera.position.x+=dx;if(!blocked(camera.position.x,camera.position.z+dz))camera.position.z+=dz;camera.rotation.set(0,yaw,0);
        plants.forEach((p,i)=>{const stage=currentPlots.current[i]?.stage;p.visible=stage>0;p.scale.setScalar(.4+(stage||0)*.22);p.rotation.y=yaw;});renderer.render(scene,camera);
      };raf=requestAnimationFrame(render);
      return ()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('blur',clear);document.removeEventListener('visibilitychange',clear);renderer.domElement.removeEventListener('keydown',keydown);renderer.domElement.removeEventListener('keyup',keyup);navigation.current=null;resources.forEach(r=>r.dispose?.());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
    }catch{cancelAnimationFrame(raf);observer?.disconnect();resources.forEach(r=>r.dispose?.());renderer?.dispose();renderer?.domElement.remove();setError('La vista 3D no está disponible en este dispositivo. Puedes usar todas las estaciones desde el jardín.');}
  },[]);
  return <section className="gh-greenhouse"><div className="gh-scene-caption"><strong>El invernadero del valle</strong><span>Luz dorada, greda y plantas que crecen contigo.</span></div>{error?<p role="alert">{error}</p>:<><div ref={host} className="gh-3d-host"/><div className="gh-walk-controls" aria-label="Caminar por el invernadero">{[['ArrowLeft','Girar izquierda'],['w','Avanzar'],['s','Retroceder'],['ArrowRight','Girar derecha']].map(([key,label])=><button key={key} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);navigation.current?.hold(key);}} onPointerUp={()=>navigation.current?.release(key)} onPointerCancel={()=>navigation.current?.release(key)} onLostPointerCapture={()=>navigation.current?.release(key)} onKeyDown={e=>{if(e.key===' '||e.key==='Enter')navigation.current?.hold(key);}} onKeyUp={()=>navigation.current?.release(key)} onBlur={()=>navigation.current?.release(key)}>{label}</button>)}</div><p>WASD para caminar · arrastra para mirar. También puedes ir directamente a una estación.</p></>}<div className="gh-station-buttons">{[[0,'Bancal 1'],[1,'Bancal 2'],[2,'Bancal 3'],['compost','Compostera'],['basket','Estante']].map(([id,label])=><button key={id} onClick={()=>navigation.current?navigation.current.station(id):onStation(id)}>{label}</button>)}</div></section>;
}
