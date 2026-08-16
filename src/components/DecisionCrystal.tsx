import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { t } from '../i18n/messages';
import { localizePath, type Lang } from '../i18n/config';

type CrystalVariant='hybrid'|'interactive'|'static';

type NodeDef={
  id:string;
  label:string;
  sub:string;
  x:number;
  y:number;
  href:string;
  origin:[number,number,number];
};

const nodes:NodeDef[]=[
  {id:'AIR',label:'AIR',sub:'Interdependency',x:78,y:19,href:'/knowledge/air/',origin:[1.55,.52,.05]},
  {id:'DSS',label:'DSS',sub:'Decision Security',x:18,y:33,href:'/knowledge/dss/',origin:[-1.45,.62,.10]},
  {id:'SCM',label:'SCM',sub:'System Coherence',x:80,y:57,href:'/knowledge/scm/',origin:[1.24,-.52,.05]},
  {id:'STS',label:'SCENARIO',sub:'Stress Testing',x:17,y:70,href:'/knowledge/scenario-stress-testing/',origin:[-1.18,-.70,.08]},
  {id:'EVI',label:'EVIDENCE',sub:'Provenance Ledger',x:73,y:80,href:'/evidence/',origin:[.62,-1.48,.06]}
];

const dssCore:NodeDef={id:'DSS_CORE',x:50,y:90,label:'DSS CORE',sub:'Foundation Layer',href:'/knowledge/dss/',origin:[0,-2.18,0]};

function diamondGeometry(){
  const seg=10, vertices:number[]=[], faces:number[]=[];
  vertices.push(0,1.72,0);
  const crown=1;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.68,1.46,Math.sin(a)*.68)}
  const girdle=crown+seg;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*1.72,.46,Math.sin(a)*1.72)}
  const pavilion=girdle+seg;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.84,-.94,Math.sin(a)*.84)}
  const bottom=pavilion+seg;vertices.push(0,-2.36,0);
  for(let i=0;i<seg;i++){
    const n=(i+1)%seg;
    faces.push(0,crown+i,crown+n);
    faces.push(crown+i,girdle+i,girdle+n,crown+i,girdle+n,crown+n);
    faces.push(girdle+i,pavilion+i,pavilion+n,girdle+i,pavilion+n,girdle+n);
    faces.push(pavilion+i,bottom,pavilion+n);
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geo.setIndex(faces);geo.computeVertexNormals();return geo;
}

export default function DecisionCrystal({
  lang='en',
  variant='hybrid',
  artworkSrc='/images/knowledge-crystal-full-clean.webp',
  showModeSwitcher=true
}:{
  lang?:Lang;
  variant?:CrystalVariant;
  artworkSrc?:string;
  showModeSwitcher?:boolean;
}){
  const m=t(lang);
  const nodeCopy={AIR:{label:'AIR',sub:m.crystal.airSub},DSS:{label:'DSS',sub:m.crystal.dssSub},SCM:{label:'SCM',sub:m.crystal.scmSub},STS:{label:m.crystal.scenario,sub:m.crystal.scenarioSub},EVI:{label:m.crystal.evidence,sub:m.crystal.evidenceSub}} as const;
  const mount=useRef<HTMLDivElement>(null);
  const activateRef=useRef<(id:string,preview?:boolean)=>void>(()=>{});
  const [active,setActive]=useState(m.crystal.knowledgeGraph);
  const [flash,setFlash]=useState<string|null>(null);
  const [mode,setMode]=useState<CrystalVariant>(variant);
  const [artworkAvailable,setArtworkAvailable]=useState(true);

  useEffect(()=>{
    setMode(variant);
  },[variant]);

  useEffect(()=>{
    const el=mount.current;if(!el)return;
    activateRef.current=()=>{};
    if(mode==='static') return;

    const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(33,el.clientWidth/el.clientHeight,.1,100);
    // Slightly wider framing than v0.8.4.1 so the full crown and pavilion stay visible.
    camera.position.set(0,-.02,10.05);

    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(el.clientWidth,el.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.28;
    renderer.domElement.setAttribute('aria-hidden','true');
    el.appendChild(renderer.domElement);

    const group=new THREE.Group();
    group.scale.setScalar(mode==='hybrid'?1.34:1.46);
    group.position.y=.18;
    scene.add(group);

    const geo=diamondGeometry();
    const mat=new THREE.MeshPhysicalMaterial({
      color:0x4b4437,emissive:0x5a3518,emissiveIntensity:.08,metalness:.34,roughness:.14,
      transmission:.58,thickness:1.8,ior:1.5,clearcoat:1,clearcoatRoughness:.05,
      transparent:true,opacity:mode==='hybrid'?.18:.34,side:THREE.DoubleSide
    });
    const mesh=new THREE.Mesh(geo,mat);group.add(mesh);

    const edgeGeo=new THREE.EdgesGeometry(geo,5);
    const baseEdgeMat=new THREE.LineBasicMaterial({
      color:0xffd9a2,transparent:true,opacity:mode==='hybrid'?.58:.70,blending:THREE.AdditiveBlending
    });
    const baseEdges=new THREE.LineSegments(edgeGeo,baseEdgeMat);baseEdges.renderOrder=2;group.add(baseEdges);

    const pulseUniforms={uTime:{value:-99},uOrigin:{value:new THREE.Vector3(1.5,.5,0)},uStrength:{value:0},uColor:{value:new THREE.Color(0xffd9a2)}};
    const pulseMat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,uniforms:pulseUniforms,
      vertexShader:`uniform vec3 uOrigin; varying float vDist; void main(){ vDist=distance(position,uOrigin); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader:`uniform float uTime; uniform float uStrength; uniform vec3 uColor; varying float vDist; void main(){float wave=uTime*2.25;float band=1.0-smoothstep(0.0,.34,abs(vDist-wave));float tail=(1.0-smoothstep(0.0,1.15,wave-vDist))*step(vDist,wave);float alpha=(band*.98+tail*.20)*uStrength;if(alpha<.012)discard;gl_FragColor=vec4(uColor,alpha);}`
    });
    const pulseEdges=new THREE.LineSegments(edgeGeo,pulseMat);pulseEdges.renderOrder=5;group.add(pulseEdges);

    const innerMat=mat.clone();innerMat.opacity=mode==='hybrid'?.035:.08;innerMat.emissiveIntensity=.03;
    const inner=new THREE.Mesh(geo,innerMat);inner.scale.setScalar(.78);group.add(inner);

    // Foundation rings make the lower termination read as a complete system rather than a cropped pavilion.
    const foundation=new THREE.Group();
    foundation.position.y=-3.03;
    foundation.rotation.x=Math.PI/2;
    [1.02,1.38,1.82].forEach((r,i)=>{
      const rg=new THREE.RingGeometry(r-.008,r+.008,96);
      const rm=new THREE.MeshBasicMaterial({color:0xb58952,transparent:true,opacity:.20-i*.045,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false});
      const ring=new THREE.Mesh(rg,rm);foundation.add(ring);
    });
    scene.add(foundation);

    const cageObjects:THREE.LineSegments[]=[];
    [2.45,3.08].forEach((s,i)=>{
      const c=new THREE.IcosahedronGeometry(s,1);
      const cm=new THREE.LineBasicMaterial({color:0xa88455,transparent:true,opacity:mode==='hybrid'?.035:.055});
      const l=new THREE.LineSegments(new THREE.EdgesGeometry(c,10),cm);
      l.rotation.set(.2+i*.3,.3+i*.5,.15);scene.add(l);cageObjects.push(l);
    });

    const pts:number[]=[];
    for(let i=0;i<100;i++){
      const r=3+Math.random()*1.9,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);
      pts.push(r*Math.sin(b)*Math.cos(a),r*Math.sin(b)*Math.sin(a),r*Math.cos(b));
    }
    const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
    const pointsMat=new THREE.PointsMaterial({color:0xffddb0,size:.015,transparent:true,opacity:.30});
    const points=new THREE.Points(pg,pointsMat);scene.add(points);

    const key=new THREE.PointLight(0xffd9a6,10,20);key.position.set(4.2,5,5);scene.add(key);
    const rim=new THREE.PointLight(0xa87741,5.5,16);rim.position.set(-4,-2,3);scene.add(rim);
    const signalLight=new THREE.PointLight(0xff8d54,0,8);scene.add(signalLight);
    scene.add(new THREE.AmbientLight(0x6f5a3e,.78));

    let pulseStart=-999,pulseDuration=2.3,previewStrength=1;
    activateRef.current=(id,preview=false)=>{
      const n=[...nodes,dssCore].find(x=>x.id===id);if(!n)return;
      pulseUniforms.uOrigin.value.set(...n.origin);signalLight.position.set(...n.origin);
      if(reducedMotion){pulseUniforms.uStrength.value=0;signalLight.intensity=0;return;}
      pulseStart=performance.now()/1000;pulseDuration=preview?1.15:2.3;previewStrength=preview?.42:1;
    };

    let mx=0,my=0,raf=0;
    const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5};
    el.addEventListener('pointermove',move);
    const resize=()=>{const w=el.clientWidth,h=el.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};
    window.addEventListener('resize',resize);

    const tick=()=>{
      raf=requestAnimationFrame(tick);
      const now=performance.now()/1000,age=now-pulseStart;
      const live=!reducedMotion&&age>=0&&age<pulseDuration;
      const decay=live?Math.pow(1-age/pulseDuration,.62):0;
      pulseUniforms.uTime.value=live?age:-99;pulseUniforms.uStrength.value=decay*previewStrength;
      signalLight.intensity=live?12*decay*previewStrength:0;
      mat.emissiveIntensity=.08+(live?1.05*decay*previewStrength:(reducedMotion?0:.04*Math.sin(now*.9)));
      if(!reducedMotion){
        // True Three.js Y rotation remains active in both interactive and hybrid modes.
        group.rotation.y+=.0011;
        group.rotation.x+=(my*.07-group.rotation.x)*.018;
        group.rotation.z+=(-mx*.048-group.rotation.z)*.018;
        foundation.rotation.z-=.00042;
      }
      renderer.render(scene,camera);
    };
    tick();

    return()=>{
      cancelAnimationFrame(raf);window.removeEventListener('resize',resize);el.removeEventListener('pointermove',move);
      geo.dispose();edgeGeo.dispose();mat.dispose();innerMat.dispose();baseEdgeMat.dispose();pulseMat.dispose();pg.dispose();pointsMat.dispose();
      foundation.children.forEach(o=>{const mesh=o as THREE.Mesh;mesh.geometry.dispose();(mesh.material as THREE.Material).dispose()});
      cageObjects.forEach(o=>{o.geometry.dispose();(o.material as THREE.Material).dispose()});renderer.dispose();
      if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);
    };
  },[mode]);

  const trigger=(id:string,label:string,preview=false)=>{
    setActive(label);activateRef.current(id,preview);
    if(!preview){setFlash(id);window.setTimeout(()=>setFlash(v=>v===id?null:v),1700)}
  };

  const coreHref=localizePath(dssCore.href,lang);
  const coreLabel=m.crystal.dssCore, coreSub=m.crystal.dssCoreSub;
  const showArtwork=mode!=='interactive'&&artworkAvailable&&Boolean(artworkSrc);

  return <div className={`crystal-wrap crystal-mode-${mode}`}>
    {showArtwork&&<img
      className="crystal-artwork"
      src={artworkSrc}
      alt=""
      aria-hidden="true"
      onError={()=>setArtworkAvailable(false)}
      draggable={false}
    />}
    <div ref={mount} className="crystal-canvas"/>
    <div className="core-label"><span>TAMVER</span><strong>DECISION<br/>SECURITY</strong><small>{active}</small></div>
    <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g>{nodes.map(n=><line className={flash===n.id?'signal':''} key={n.id} x1="50" y1="50" x2={n.x} y2={n.y}/>)}</g>
      <line className="foundation-line" x1="50" y1="50" x2={dssCore.x} y2={dssCore.y}/>
    </svg>

    {nodes.map(n=>{const c=nodeCopy[n.id as keyof typeof nodeCopy] ?? {label:n.label,sub:n.sub}; const href=localizePath(n.href,lang); return <a
      key={n.id}
      href={href}
      aria-label={`${c.label}: ${c.sub}`}
      className={`graph-node graph-node-${n.id.toLowerCase()} ${flash===n.id?'flash':''}`}
      style={{left:`${n.x}%`,top:`${n.y}%`}}
      onPointerEnter={()=>trigger(n.id,c.label,true)}
      onPointerLeave={()=>setActive(m.crystal.knowledgeGraph)}
      onFocus={()=>trigger(n.id,c.label,true)}
      onBlur={()=>setActive(m.crystal.knowledgeGraph)}
      onClick={(e)=>{
        e.preventDefault();trigger(n.id,n.label,false);
        window.setTimeout(()=>{window.location.href=href},520);
      }}
    ><i/><b>{c.label}</b><span>{c.sub}</span></a>})}

    <a
      href={coreHref}
      className={`graph-node graph-node-core ${flash===dssCore.id?'flash':''}`}
      style={{left:`${dssCore.x}%`,top:`${dssCore.y}%`}}
      aria-label={`${coreLabel}: ${coreSub}`}
      onPointerEnter={()=>trigger(dssCore.id,coreLabel,false)}
      onPointerLeave={()=>setActive(m.crystal.knowledgeGraph)}
      onFocus={()=>trigger(dssCore.id,coreLabel,false)}
      onBlur={()=>setActive(m.crystal.knowledgeGraph)}
      onClick={(e)=>{
        e.preventDefault();trigger(dssCore.id,coreLabel,false);
        window.setTimeout(()=>{window.location.href=coreHref},520);
      }}
    ><i/><b>{coreLabel}</b><span>{coreSub}</span></a>

    {showModeSwitcher&&<div className="crystal-mode-switcher" role="group" aria-label="Crystal view mode">
      {(['hybrid','interactive','static'] as CrystalVariant[]).map(v=><button
        key={v}
        type="button"
        className={mode===v?'active':''}
        aria-pressed={mode===v}
        onClick={()=>setMode(v)}
      >{v}</button>)}
    </div>}
  </div>;
}
