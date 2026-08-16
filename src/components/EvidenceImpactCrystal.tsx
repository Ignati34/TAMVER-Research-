import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { EvidenceImpactProjection, ImpactNode, ImpactStage } from "../lib/impact/types";
import { projectEvidenceImpact } from "../lib/impact/project-impact";
import { sanitizeTrace } from "../lib/ledger/publication-gateway";
import { v12TraceFixture } from "../lib/ledger/v12-fixture";
import { fetchV13EvidenceImpact } from "../lib/impact/v13-client";

const stageOrder: ImpactStage[] = ["EVIDENCE_ITEM","SCENARIO_NODE","FORMULA","METRIC","DECISION_GATE","REPORT_CLAIM"];

type LayoutPoint={x:number;y:number;align?:"left"|"center"|"right"};

function layoutPoint(stage:ImpactStage,index:number,count:number):LayoutPoint{
  const mid=(count-1)/2;
  switch(stage){
    case "SCENARIO_NODE": {
      const gap=Math.min(12,30/Math.max(1,count-1));
      return {x:16,y:61+(index-mid)*gap,align:"left"};
    }
    case "FORMULA": {
      const gap=Math.min(12,28/Math.max(1,count-1));
      return {x:82,y:62+(index-mid)*gap,align:"left"};
    }
    case "METRIC": {
      const gap=Math.min(11,22/Math.max(1,count-1));
      return {x:18,y:27+(index-mid)*gap,align:"left"};
    }
    case "DECISION_GATE": {
      const gap=Math.min(11,22/Math.max(1,count-1));
      return {x:82,y:28+(index-mid)*gap,align:"left"};
    }
    case "REPORT_CLAIM": {
      const spread=Math.min(23,46/Math.max(1,count-1));
      return {x:50+(index-mid)*spread,y:9,align:"center"};
    }
    case "EVIDENCE_ITEM":
    default: {
      const spread=Math.min(24,48/Math.max(1,count-1));
      return {x:50+(index-mid)*spread,y:86,align:"center"};
    }
  }
}

function geometry(){
  const seg=10,vertices:number[]=[],faces:number[]=[];
  vertices.push(0,1.72,0);
  const crown=1;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.72,1.50,Math.sin(a)*.72)}
  const girdle=crown+seg;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*1.78,.48,Math.sin(a)*1.78)}
  const pavilion=girdle+seg;
  for(let i=0;i<seg;i++){const a=i/seg*Math.PI*2;vertices.push(Math.cos(a)*.88,-.90,Math.sin(a)*.88)}
  const bottom=pavilion+seg;vertices.push(0,-2.42,0);
  for(let i=0;i<seg;i++){
    const n=(i+1)%seg;
    faces.push(0,crown+i,crown+n);
    faces.push(crown+i,girdle+i,girdle+n,crown+i,girdle+n,crown+n);
    faces.push(girdle+i,pavilion+i,pavilion+n,girdle+i,pavilion+n,girdle+n);
    faces.push(pavilion+i,bottom,pavilion+n);
  }
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));g.setIndex(faces);g.computeVertexNormals();return g;
}

function nodeScore(n:ImpactNode){
  if(n.stage!=="EVIDENCE_ITEM") return 1;
  const c=n.confidence??1,q=(n.qualityScore??100)/100;
  return Math.max(.35,Math.min(1,(c+q)/2));
}

export default function EvidenceImpactCrystal({evidenceId="ev-supplier-single-point"}:{evidenceId?:string}){
  const trace=useMemo(()=>sanitizeTrace(v12TraceFixture),[]);
  const [impact,setImpact]=useState<EvidenceImpactProjection>(()=>projectEvidenceImpact(trace,evidenceId));
  const [selected,setSelected]=useState<ImpactNode|null>(null);
  const [flash,setFlash]=useState<string|null>(null);
  const activateRef=useRef<(stage:ImpactStage,preview?:boolean)=>void>(()=>{});
  const [mode,setMode]=useState<"projection"|"v13">("projection");
  const mount=useRef<HTMLDivElement>(null);

  useEffect(()=>{fetchV13EvidenceImpact(evidenceId).then(live=>{if(live){setImpact(live);setMode("v13")}})},[evidenceId]);

  useEffect(()=>{
    const el=mount.current;if(!el)return;
    const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
    const scene=new THREE.Scene();

    // Wider framing than the original impact crystal so the crown, pavilion and
    // lower termination remain fully visible inside the stage at desktop sizes.
    const camera=new THREE.PerspectiveCamera(34,el.clientWidth/el.clientHeight,.1,100);
    camera.position.set(0,-.24,10.85);

    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(el.clientWidth,el.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.2;
    renderer.domElement.setAttribute('aria-hidden','true');
    el.appendChild(renderer.domElement);

    const group=new THREE.Group();
    group.scale.setScalar(1.46);
    group.position.y=.28;
    scene.add(group);

    const geo=geometry();
    const mat=new THREE.MeshPhysicalMaterial({color:0x4b4437,emissive:0x5a3518,emissiveIntensity:.08,metalness:.34,roughness:.12,transmission:.54,thickness:1.8,ior:1.5,clearcoat:1,clearcoatRoughness:.04,transparent:true,opacity:.34,side:THREE.DoubleSide});
    const mesh=new THREE.Mesh(geo,mat);group.add(mesh);
    const edgeGeo=new THREE.EdgesGeometry(geo,5);
    const edgeMat=new THREE.LineBasicMaterial({color:0xffd9a2,transparent:true,opacity:.72,blending:THREE.AdditiveBlending});
    const edges=new THREE.LineSegments(edgeGeo,edgeMat);group.add(edges);

    const pulseUniforms={uTime:{value:-99},uOrigin:{value:new THREE.Vector3(0,-1.8,0)},uStrength:{value:0},uColor:{value:new THREE.Color(0xffd9a2)}};
    const pulseMat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,uniforms:pulseUniforms,
      vertexShader:`uniform vec3 uOrigin; varying float vDist; void main(){vDist=distance(position,uOrigin);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader:`uniform float uTime; uniform float uStrength; uniform vec3 uColor; varying float vDist; void main(){float wave=uTime*2.2;float band=1.0-smoothstep(0.0,.34,abs(vDist-wave));float tail=(1.0-smoothstep(0.0,1.1,wave-vDist))*step(vDist,wave);float a=(band*.98+tail*.18)*uStrength;if(a<.012)discard;gl_FragColor=vec4(uColor,a);}`
    });
    const pulseEdges=new THREE.LineSegments(edgeGeo,pulseMat);pulseEdges.renderOrder=5;group.add(pulseEdges);
    const innerMat=mat.clone();innerMat.opacity=.08;const inner=new THREE.Mesh(geo,innerMat);inner.scale.setScalar(.78);group.add(inner);

    const haloGeo=new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.35,1),7);
    const haloMat=new THREE.LineBasicMaterial({color:0xa88455,transparent:true,opacity:.05});
    const halo=new THREE.LineSegments(haloGeo,haloMat);scene.add(halo);

    // Foundation rings visually complete the lower termination and make it
    // obvious that the crystal is not being clipped by the container.
    const foundation=new THREE.Group();
    foundation.position.y=-2.72;
    foundation.rotation.x=Math.PI/2;
    [0.82,1.12,1.48].forEach((r,i)=>{
      const rg=new THREE.RingGeometry(r-.007,r+.007,96);
      const rm=new THREE.MeshBasicMaterial({color:0xb58952,transparent:true,opacity:.18-i*.04,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false});
      foundation.add(new THREE.Mesh(rg,rm));
    });
    scene.add(foundation);

    scene.add(new THREE.AmbientLight(0x6f5a3e,.8));
    const key=new THREE.PointLight(0xffd9a6,10,22);key.position.set(4,5,5);scene.add(key);
    const rim=new THREE.PointLight(0xa87741,5.5,18);rim.position.set(-4,-3,3);scene.add(rim);
    const signalLight=new THREE.PointLight(0xff8d54,0,8);scene.add(signalLight);

    let pulseStart=-999,pulseDuration=2.3,previewStrength=1;
    const origins:Record<ImpactStage,[number,number,number]>={
      EVIDENCE_ITEM:[0,-1.9,.05],SCENARIO_NODE:[-1.45,-.48,.08],FORMULA:[1.45,-.44,.08],METRIC:[-1.35,.66,.08],DECISION_GATE:[1.35,.66,.08],REPORT_CLAIM:[0,1.52,.05]
    };
    activateRef.current=(stage,preview=false)=>{
      const o=origins[stage];pulseUniforms.uOrigin.value.set(...o);signalLight.position.set(...o);
      if(reducedMotion){pulseUniforms.uStrength.value=0;signalLight.intensity=0;return;}
      pulseStart=performance.now()/1000;pulseDuration=preview?1.15:2.3;previewStrength=preview?.42:1;
    };

    let raf=0,mx=0,my=0;
    const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5};
    el.addEventListener("pointermove",move);
    const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};
    window.addEventListener("resize",resize);

    const tick=()=>{
      raf=requestAnimationFrame(tick);
      const now=performance.now()/1000;
      const age=now-pulseStart;
      const live=!reducedMotion&&age>=0&&age<pulseDuration;
      const decay=live?Math.pow(1-age/pulseDuration,.62):0;
      pulseUniforms.uTime.value=live?age:-99;
      pulseUniforms.uStrength.value=decay*previewStrength;
      signalLight.intensity=live?12*decay*previewStrength:0;
      mat.emissiveIntensity=.08+(live?1.0*decay*previewStrength:(reducedMotion?0:.035*Math.sin(now*.9)));
      if(!reducedMotion){
        group.rotation.y+=.0012;
        group.rotation.x+=(my*.07-group.rotation.x)*.018;
        group.rotation.z+=(-mx*.045-group.rotation.z)*.018;
        halo.rotation.y-=.00055;
        foundation.rotation.z-=.00035;
      }
      renderer.render(scene,camera);
    };
    tick();

    return()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",resize);
      el.removeEventListener("pointermove",move);
      geo.dispose();edgeGeo.dispose();edgeMat.dispose();pulseMat.dispose();innerMat.dispose();haloGeo.dispose();haloMat.dispose();mat.dispose();
      foundation.children.forEach(o=>{const m=o as THREE.Mesh;m.geometry.dispose();(m.material as THREE.Material).dispose()});
      renderer.dispose();
      if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);
    };
  },[]);

  const byStage=useMemo(()=>stageOrder.flatMap(stage=>{
    const stageNodes=impact.nodes.filter(n=>n.stage===stage);
    return stageNodes.map((node,i)=>({node,stage,point:layoutPoint(stage,i,stageNodes.length)}));
  }),[impact]);

  const activate=(node:ImpactNode,preview=false)=>{
    if(!preview){setSelected(node);setFlash(node.id);window.setTimeout(()=>setFlash(v=>v===node.id?null:v),1700)}
    activateRef.current(node.stage,preview);
  };

  return <div className="impact-shell">
    <div className="impact-status"><span>EVIDENCE IMPACT CRYSTAL</span><b>{mode==="v13"?"V13 LIVE FORWARD LINEAGE":"V12 TRACE PROJECTION"}</b></div>
    <div
      className="impact-stage"
      style={{height:'min(940px,84vw)',minHeight:'720px',maxHeight:'940px',overflow:'visible'}}
    >
      <div ref={mount} className="impact-canvas"/>
      <div className="impact-core"><span>TAMVER</span><strong>DECISION<br/>EVIDENCE</strong><small>{selected?.stage.replaceAll("_"," ")||"FORWARD IMPACT"}</small></div>
      <svg className="impact-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {byStage.map(({node,point})=><line key={node.id} x1="50" y1="50" x2={point.x} y2={point.y}/>)}
      </svg>
      {byStage.map(({node,stage,point})=><button
        key={node.id}
        type="button"
        aria-label={`${stage.replaceAll('_',' ')}: ${node.label}`}
        className={`impact-node impact-${stage.toLowerCase()} ${selected?.id===node.id?"active":""} ${flash===node.id?"flash":""}`}
        data-align={point.align||'left'}
        style={{left:`${point.x}%`,top:`${point.y}%`,opacity:Math.max(.55,nodeScore(node))}}
        onClick={()=>activate(node,false)}
        onPointerEnter={()=>activate(node,true)}
        onFocus={()=>activate(node,true)}
      >
        <i/><b>{node.stage.replaceAll("_"," ")}</b><span>{node.label}</span>
      </button>)}
    </div>
    <div className="impact-inspector">
      <div><span className="tv-eyebrow">SELECTED IMPACT NODE</span><h3>{selected?.label||"Select a node around the crystal"}</h3><p>{selected?`${selected.stage.replaceAll("_"," ")} · ${selected.id}`:"Click a node to inspect its public metadata."}</p></div>
      <pre>{selected?JSON.stringify(selected.details??{},null,2):"Evidence confidence controls visual strength. Internal source URIs remain behind the publication boundary."}</pre>
    </div>
    <div className="impact-limitations"><span>LINEAGE BASIS</span><strong>{impact.basis.replaceAll("_"," ")}</strong>{impact.limitations.map(x=><p key={x}>{x}</p>)}</div>
  </div>;
}
