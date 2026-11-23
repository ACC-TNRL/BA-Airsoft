(()=>{"use strict";
/* Veldgegevens B&A: locaties, iconen, respawns, raster en ijkpunten. Kaarteenheden: 1195 x 1004. */
const MAP_W=1195, MAP_H=1004;
const GRID={x0:36,y0:32,cw:44.12,ch:43.76,cols:26,rows:22};
// [naam, x, y, voorkeurskant label: r/l/t/b]
const LOCS=[["FOB",206,108,"r"],["HQ Rood",232,155,"l"],["Patriot system",326,160,"t"],["Artillery base",113,213,"b"],["Samsite",235,210,"r"],["Caravan",268,247,"r"],["Howitzer",138,308,"r"],["Kasteel",128,365,"l"],["Van",200,342,"r"],["Hospital",207,383,"b"],["Mine field",315,385,"r"],["Jail",111,413,"l"],["Church",139,465,"r"],["Ammodump",103,663,"r"],["Air defence",255,671,"r"],["Fuel dump",294,738,"r"],["HQ Blauw",202,757,"l"],["Plane",175,818,"r"],["Saw mill",320,827,"r"],["Radio outpost",181,886,"r"],["Power plant",582,92,"l"],["War factory",729,85,"t"],["Helipad",858,75,"r"],["Politiebureau",617,132,"l"],["Brandweer",679,130,"r"],["Drone control",800,137,"r"],["Research center",987,148,"r"],["Winkels",620,170,"t"],["Nieuwe kerk",548,173,"l"],["Oil drill tower",690,167,"r"],["Ziekenhuis",593,207,"l"],["Bank",636,200,"r"],["Silvermine",608,245,"r"],["Airstrip",863,226,"r"]].map(a=>({n:a[0],x:a[1],y:a[2],side:a[3]}));
const ICONS={"FOB":"<path d=\"M-8,6 L0,-6 L8,6 Z M0,-6 V6 M-3,6 L0,1 L3,6\"/>",
"HQ Rood":"<text y=\"4.5\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"12\" fill=\"#fff\" stroke=\"none\">HQ</text>",
"HQ Blauw":"<text y=\"4.5\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"12\" fill=\"#fff\" stroke=\"none\">HQ</text>",
"Patriot system":"<path d=\"M-8,7 H8 M-2,7 V3\"/><path d=\"M-7,2 L3,-8 L7,-4 L-3,6 Z\" fill=\"#1a1c19\"/>",
"Artillery base":"<path d=\"M-3,1 L8,-7\" stroke-width=\"3.4\"/><circle cx=\"-3\" cy=\"4\" r=\"3.6\"/><path d=\"M-3,4 L-9,8\"/>",
"Samsite":"<path d=\"M-7,7 L4,-4\" stroke-width=\"3\"/><path d=\"M8,-8 L1,-6 L6,-1 Z M-7,7 l-2,-4 M-7,7 l4,2\" fill=\"#1a1c19\"/>",
"Caravan":"<path d=\"M-9,-5 H3 a5,5 0 0 1 5,5 V5 H-9 Z\"/><path d=\"M-6,-2 h5 v3 h-5 Z M8,5 h2\"/><circle cx=\"-2\" cy=\"6\" r=\"2.4\" fill=\"#fff\"/>",
"Howitzer":"<path d=\"M-2,-1 L7,-8\" stroke-width=\"4\"/><circle cx=\"-3\" cy=\"3\" r=\"4.6\"/><circle cx=\"-3\" cy=\"3\" r=\"1\" fill=\"#1a1c19\"/><path d=\"M-6,6 L-10,9\"/>",
"Kasteel":"<path d=\"M-9,8 V-3 h3 v-4 h2.4 v4 h2.4 v-4 h2.4 v4 h2.4 v-4 h2.4 v4 h3 V8 Z\"/><path d=\"M-2.4,8 V3.5 a2.4,2.4 0 0 1 4.8,0 V8\" fill=\"#1a1c19\"/>",
"Van":"<path d=\"M-9,-5 H2 V5 H-9 Z M2,-2 H6 L9,1 V5 H2\" /><circle cx=\"-5\" cy=\"6\" r=\"2.3\" fill=\"#fff\"/><circle cx=\"5\" cy=\"6\" r=\"2.3\" fill=\"#fff\"/>",
"Hospital":"<path d=\"M-2.6,-8 h5.2 v5.4 h5.4 v5.2 h-5.4 v5.4 h-5.2 v-5.4 h-5.4 v-5.2 h5.4 Z\" fill=\"#c4122f\" stroke=\"#c4122f\"/>",
"Mine field":"<circle cy=\"1\" r=\"4.4\" fill=\"#1a1c19\"/><path d=\"M0,-8 V-4 M0,6 V10 M-9,1 H-5 M5,1 H9 M-6.4,-5.4 L-3.6,-2.6 M6.4,-5.4 L3.6,-2.6 M-6.4,7.4 L-3.6,4.6 M6.4,7.4 L3.6,4.6\"/>",
"Jail":"<path d=\"M-7.5,-7.5 h15 v15 h-15 Z M-3.7,-7.5 v15 M0,-7.5 v15 M3.7,-7.5 v15\"/>",
"Church":"<path d=\"M-6,8 V0 L0,-5 L6,0 V8 Z M0,-5 V-10 M-2.2,-8 h4.4\"/><path d=\"M-1.6,8 V4 h3.2 V8\" fill=\"#1a1c19\"/>",
"Ammodump":"<path d=\"M-7,8 V0 a2,4 0 0 1 4,0 V8 Z M-2,8 V-2 a2,4 0 0 1 4,0 V8 Z M3,8 V0 a2,4 0 0 1 4,0 V8 Z\" fill=\"#1a1c19\"/>",
"Air defence":"<path d=\"M-7,-5 A9,9 0 0 0 6,6 Z\" fill=\"#1a1c19\"/><path d=\"M0,0 L6,-7 M-1,3 V9 M-5,9 H3\"/><circle cx=\"6\" cy=\"-7\" r=\"1.3\" fill=\"#1a1c19\"/>",
"Fuel dump":"<path d=\"M-6,-5 H2 L6,-1 V8 H-6 Z M-3,-5 V-8 H1 M-3,1 L3,6 M3,1 L-3,6\"/>",
"Plane":"<path transform=\"rotate(45)\" d=\"M0,-10 L2,-3 L10,2 V4 L2,2 L1.5,6 L4,8.5 V9.5 L0,8.5 L-4,9.5 V8.5 L-1.5,6 L-2,2 L-10,4 V2 L-2,-3 Z\" fill=\"#1a1c19\"/>",
"Airstrip":"<path transform=\"translate(0,-2) rotate(90) scale(.8)\" d=\"M0,-10 L2,-3 L10,2 V4 L2,2 L1.5,6 L4,8.5 V9.5 L0,8.5 L-4,9.5 V8.5 L-1.5,6 L-2,2 L-10,4 V2 L-2,-3 Z\" fill=\"#1a1c19\"/><path d=\"M-9,8 H9\" stroke-dasharray=\"3 2\"/>",
"Saw mill":"<circle r=\"7\" stroke-width=\"3.4\" stroke-dasharray=\"2.4 3.1\"/><circle r=\"5\" fill=\"#fff\"/><circle r=\"1.6\" fill=\"#1a1c19\"/>",
"Radio outpost":"<path d=\"M0,9 V-2 M-4.5,9 L0,-2 L4.5,9 M-2.6,4.5 h5.2 M-4.5,-4.5 a6,6 0 0 1 9,0 M-7.5,-7 a10,10 0 0 1 15,0\"/><circle cy=\"-2\" r=\"1.4\" fill=\"#1a1c19\"/>",
"Power plant":"<path d=\"M-6,8 Q-2,1 -4.5,-6 H4.5 Q2,1 6,8 Z M-4,3 H4\"/><path d=\"M-1,-8 q2,-1 0,-3 M2,-8 q2,-1 0,-3\" stroke-width=\"1.2\"/>",
"War factory":"<path d=\"M-9,8 V-1 L-4,2 V-1 L1,2 V-8 H5 V2 H9 V8 Z\"/><path d=\"M-6,5 h2 M-1,5 h2 M4,5 h2\"/>",
"Helipad":"<text y=\"6\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"17\" fill=\"#1a1c19\" stroke=\"none\">H</text>",
"Politiebureau":"<path d=\"M0,-9 L7.5,-6 V0 Q7.5,6 0,9.5 Q-7.5,6 -7.5,0 V-6 Z\"/><path d=\"M0,-4.5 L1.4,-1 L5,-1 L2.1,1.2 L3.2,4.8 L0,2.6 L-3.2,4.8 L-2.1,1.2 L-5,-1 L-1.4,-1 Z\" fill=\"#1a1c19\" stroke=\"none\"/>",
"Brandweer":"<path d=\"M0,-10 C6,-4 8,0 6,5 C4.5,9 -4.5,9 -6,5 C-8,1 -4,-1 -3,-5 C-1.5,-3 0,-4 0,-10 Z\" fill=\"#e2571c\" stroke=\"#b33d0c\"/><path d=\"M0,0 C2,2 3,4 2,6 C1,7.5 -1,7.5 -2,6 C-3,4 -1,3 0,0 Z\" fill=\"#ffd34d\" stroke=\"none\"/>",
"Drone control":"<path d=\"M-5.5,-5.5 L5.5,5.5 M5.5,-5.5 L-5.5,5.5\"/><circle cx=\"-6\" cy=\"-6\" r=\"3\"/><circle cx=\"6\" cy=\"-6\" r=\"3\"/><circle cx=\"-6\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"6\" r=\"3\"/><rect x=\"-2.4\" y=\"-2.4\" width=\"4.8\" height=\"4.8\" fill=\"#1a1c19\"/>",
"Research center":"<path d=\"M-3,-9 H3 M-1.8,-9 V-3 L-7.5,8 H7.5 L1.8,-3 V-9\"/><path d=\"M-4.6,3 H4.6 L7,8 H-7 Z\" fill=\"#1a1c19\"/>",
"Winkels":"<path d=\"M-6.5,-3 H6.5 L5.5,8.5 H-5.5 Z\"/><path d=\"M-3,-1 V-5 a3,3 0 0 1 6,0 V-1\"/>",
"Nieuwe kerk":"<path d=\"M-9,8 V1 H-1 V8 M-1,8 V-3 L3,-7 L7,-3 V8 Z M3,-7 V-10.5 M1.2,-9 h3.6\"/><path d=\"M2,8 V4.5 h2 V8\" fill=\"#1a1c19\"/>",
"Oil drill tower":"<path d=\"M-6.5,9 L0,-9 L6.5,9 M-4.7,4 H4.7 M-2.6,-2 H2.6 M-4.7,4 L2.6,-2 M4.7,4 L-2.6,-2\"/>",
"Ziekenhuis":"<path d=\"M0,8.5 C-13,-1 -6,-10 0,-4 C6,-10 13,-1 0,8.5 Z\" fill=\"#c4122f\" stroke=\"#c4122f\"/><path d=\"M0,-3 V4 M-3.5,0.5 H3.5\" stroke=\"#fff\" stroke-width=\"2.2\"/>",
"Bank":"<text y=\"6.5\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"18\" fill=\"#1a1c19\" stroke=\"none\">$</text>",
"Silvermine":"<path d=\"M-7,8 L4,-3\" stroke-width=\"2.6\"/><path d=\"M-3,-8 Q6,-8 8.5,2\" stroke-width=\"3\"/>"};
// [x, y, team]
const SPAWNS=[[84,78,"b"],[436,75,"b"],[1141,62,"b"],[105,839,"b"],[451,244,"r"],[366,338,"r"],[1026,214,"r"],[396,917,"r"]];
const CAL=[{n:"Winkels",lat:52.528251,lon:5.530833,x:607,y:171},{n:"Kasteel",lat:52.530185,lon:5.529696,x:128,y:365},{n:"Vliegtuig",lat:52.529990,lon:5.526102,x:175,y:818},{n:"Van",lat:52.529750,lon:5.529525,x:200,y:343},{n:"Caravan",lat:52.529606,lon:5.530197,x:267,y:248}];
const FIELD=[[57,64],[1168,41],[1170,119],[1049,248],[394,285],[431,960],[82,923]];
const SAFE=[[188,418],[407,416],[410,578],[187,580]];
const SEMI={c0:8,c1:16,r0:0,r1:5}; // vakken I1 t/m Q6: alleen semi-auto
const SMALL_ROWS=11; // klein veld: t/m rij 11 (westkant); de oostkant doet altijd mee
const DEATHZONE={x:125,y:536};

/* Koppeling tussen de getekende kaart en GPS, via de ijkpunten (CAL).
   Rechte fit met kleinste kwadraten (eigen schaal per richting, de kaart is met de hand getekend),
   daarna wordt elk ijkpunt precies op zijn plek getrokken en het verschil over de omgeving verdeeld. */
const GEO=(()=>{
  const c=CAL, n=c.length, kx=111320*Math.cos(c[0].lat*Math.PI/180), ky=110540;
  const z=c.map(p=>[(p.lon-c[0].lon)*kx,-(p.lat-c[0].lat)*ky]);
  let ee=0,es=0,ss=0,e1=0,s1=0,ex=0,sx=0,x1=0,ey=0,sy=0,y1=0;
  z.forEach((p,i)=>{const e=p[0],s=p[1],X=c[i].x,Y=c[i].y;ee+=e*e;es+=e*s;ss+=s*s;e1+=e;s1+=s;ex+=e*X;sx+=s*X;x1+=X;ey+=e*Y;sy+=s*Y;y1+=Y});
  const det=ee*(ss*n-s1*s1)-es*(es*n-s1*e1)+e1*(es*s1-ss*e1);
  const sol=(a,b,d)=>[(a*(ss*n-s1*s1)-es*(b*n-s1*d)+e1*(b*s1-ss*d))/det,(ee*(b*n-s1*d)-a*(es*n-s1*e1)+e1*(es*d-b*e1))/det,(ee*(ss*d-b*s1)-es*(es*d-b*e1)+a*(es*s1-ss*e1))/det];
  const X=sol(ex,sx,x1), Y=sol(ey,sy,y1), M=[X[0],X[1],Y[0],Y[1],X[2],Y[2]];
  const D=M[0]*M[3]-M[1]*M[2];
  const res=z.map((p,i)=>[c[i].x-(M[0]*p[0]+M[1]*p[1]+M[4]),c[i].y-(M[2]*p[0]+M[3]*p[1]+M[5])]);
  function toMap(lat,lon){
    const e=(lon-c[0].lon)*kx, s=-(lat-c[0].lat)*ky; let x=M[0]*e+M[1]*s+M[4], y=M[2]*e+M[3]*s+M[5];
    let w=0,rx=0,ry=0; z.forEach((p,i)=>{const k=1/((p[0]-e)**2+(p[1]-s)**2+1);w+=k;rx+=k*res[i][0];ry+=k*res[i][1]});
    return{x:x+rx/w,y:y+ry/w};
  }
  function lin(x,y){const dx=x-M[4],dy=y-M[5],e=(M[3]*dx-M[1]*dy)/D,s=(-M[2]*dx+M[0]*dy)/D;return{lat:c[0].lat-s/ky,lon:c[0].lon+e/kx}}
  function toGeo(x,y){ // omgekeerd, met een paar correctiestappen zodat heen en terug klopt
    let g=lin(x,y);
    for(let k=0;k<8;k++){const m=toMap(g.lat,g.lon),a=lin(x,y),b=lin(m.x,m.y);g={lat:g.lat+a.lat-b.lat,lon:g.lon+a.lon-b.lon}}
    return g;
  }
  const upm=Math.sqrt(Math.abs(D)); // kaarteenheden per meter
  return{toMap,toGeo,meters:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y)/upm,upm,
    bearing(){const a=lin(600,600),b=lin(600,300),k=Math.cos(a.lat*Math.PI/180);return Math.round(Math.atan2((b.lon-a.lon)*k,b.lat-a.lat)*180/Math.PI)}};
})();

/* De getekende basiskaart, in de stijl van een oriëntatieloopkaart. */
const COLX=i=>GRID.x0+i*GRID.cw, ROWY=j=>GRID.y0+j*GRID.ch;
const cellOf=(x,y)=>({c:Math.floor((x-GRID.x0)/GRID.cw),r:Math.floor((y-GRID.y0)/GRID.ch)});
const cellCode=(x,y)=>{const k=cellOf(x,y);return String.fromCharCode(65+k.c)+(k.r+1)};
const SMALL_Y=ROWY(SMALL_ROWS), SMALL_X=COLX(9);
const inSmall=l=>l.y<SMALL_Y||l.x>SMALL_X;
const inSemi=l=>{const k=cellOf(l.x,l.y);return k.c>=SEMI.c0&&k.c<=SEMI.c1&&k.r>=SEMI.r0&&k.r<=SEMI.r1};
const FIELD_BOX=(()=>{const xs=FIELD.map(p=>p[0]),ys=FIELD.map(p=>p[1]);return[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]})();
const pts=a=>a.map(p=>p.join(",")).join(" ");

function baseMapSVG(o){ // o: {grid, zones, small, spawns}
  o=o||{}; const f=pts(FIELD); let s="";
  s+='<defs><clipPath id="bm-clip"><polygon points="'+f+'"/></clipPath>'+
     '<pattern id="bm-oob" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><rect width="9" height="9" fill="#fff"/><line x1="0" y1="0" x2="0" y2="9" stroke="#B4237A" stroke-width="2.4" stroke-opacity=".55"/></pattern>'+
     '<pattern id="bm-out" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="14" fill="#F3F4F0"/><line x1="0" y1="0" x2="0" y2="14" stroke="#E2E4DE" stroke-width="4"/></pattern></defs>';
  s+='<rect width="'+MAP_W+'" height="'+MAP_H+'" fill="url(#bm-out)"/>';
  s+='<polygon points="'+f+'" fill="#DDEBC9"/><g clip-path="url(#bm-clip)">';
  // open terrein (geel) en dicht bos (groen), zoals op een o-kaart
  s+='<g fill="#F6E7A6">'+[[135,150,40,60],[255,290,75,38],[139,470,40,38],[200,795,62,58],[345,900,45,60],[770,150,34,120],[900,250,160,22],[420,170,34,120]].map(e=>'<ellipse cx="'+e[0]+'" cy="'+e[1]+'" rx="'+e[2]+'" ry="'+e[3]+'"/>').join("")+"</g>";
  s+='<g fill="#B5D79C">'+[[930,140,130,75],[300,520,60,30],[120,720,50,70],[250,130,60,30]].map(e=>'<ellipse cx="'+e[0]+'" cy="'+e[1]+'" rx="'+e[2]+'" ry="'+e[3]+'"/>').join("")+"</g>";
  // paden: zwarte stippellijnen
  s+='<g fill="none" stroke="#2A2722" stroke-width="2" stroke-dasharray="7 4" stroke-linecap="round" stroke-linejoin="round">'+
     ["M119,80 H347","M87,114 Q92,170 190,245 T318,368","M351,82 L366,274 Q400,262 405,236 Q420,222 447,224","M534,100 Q590,88 620,70 Q660,55 703,73","M455,192 Q500,160 566,172","M78,573 H182","M78,620 Q200,622 300,660 Q330,740 345,850 Q352,900 385,915","M228,584 L219,632","M128,903 Q250,935 374,926"].map(d=>'<path d="'+d+'" vector-effect="non-scaling-stroke"/>').join("")+"</g>";
  // sloot
  s+='<polygon points="379,82 396,82 399,254 383,254" fill="#3D9CD6" stroke="#1F6FA3" stroke-width="1.2"/><ellipse cx="401" cy="279" rx="9" ry="5" fill="#3D9CD6"/>';
  // bebouwing bij Winkels
  s+='<g fill="#8E918B"><rect x="590" y="156" width="26" height="12"/><rect x="620" y="156" width="30" height="12"/><rect x="590" y="172" width="18" height="13"/><rect x="612" y="172" width="38" height="13"/></g>';
  s+="</g>";
  // safe zone: verboden gebied (paarse arcering)
  s+='<polygon points="'+pts(SAFE)+'" fill="url(#bm-oob)" stroke="#B4237A" stroke-width="2.2" vector-effect="non-scaling-stroke"/>'+
     '<g fill="#5F625C"><path d="M206,470 h30 v20 h-12 v32 h-18 Z"/><rect x="250" y="476" width="22" height="16" transform="rotate(-35 261 484)"/><rect x="282" y="462" width="24" height="18" transform="rotate(28 294 471)"/><rect x="236" y="516" width="18" height="14" transform="rotate(20 245 523)"/><rect x="250" y="548" width="24" height="18" transform="rotate(15 262 557)"/></g>'+
     '';
  if(o.zones!==false){
    const x0=COLX(SEMI.c0),x1=COLX(SEMI.c1+1),y0=ROWY(SEMI.r0),y1=ROWY(SEMI.r1+1);
    s+='<g clip-path="url(#bm-clip)"><rect x="'+x0+'" y="'+y0+'" width="'+(x1-x0)+'" height="'+(y1-y0)+'" fill="#E8862A" fill-opacity=".09" stroke="#D9711B" stroke-width="2.2" stroke-dasharray="9 6" vector-effect="non-scaling-stroke"/></g>';
  }
  s+='<polygon points="'+f+'" fill="none" stroke="#2A2722" stroke-width="2.6" vector-effect="non-scaling-stroke"/>';
  if(o.grid!==false){
    let g=""; for(let i=0;i<=GRID.cols;i++)g+='<line x1="'+COLX(i)+'" y1="'+ROWY(0)+'" x2="'+COLX(i)+'" y2="'+ROWY(i<=9?GRID.rows:6)+'"/>';
    for(let j=0;j<=GRID.rows;j++)g+='<line x1="'+COLX(0)+'" y1="'+ROWY(j)+'" x2="'+COLX(j<=6?GRID.cols:9)+'" y2="'+ROWY(j)+'"/>';
    s+='<g stroke="#1A1C19" stroke-opacity=".16" stroke-width="1" vector-effect="non-scaling-stroke">'+g+"</g>";
  }
  if(o.small){ // klein veld: wat niet meedoet grijs
    s+='<path fill-rule="evenodd" d="M0,'+SMALL_Y+" H"+(SMALL_X+4)+" V"+MAP_H+" H0 Z M187,"+SMALL_Y+" L409,"+SMALL_Y+' L411,580 L186,582 Z" fill="#F1F2EC" fill-opacity=".86"/>'+
       '<path d="M0,'+SMALL_Y+" H187 M410,"+SMALL_Y+" H"+(SMALL_X+4)+'" stroke="#1A1C19" stroke-width="2.4" stroke-dasharray="9 6" fill="none" vector-effect="non-scaling-stroke"/>';
  }
  if(o.spawns)SPAWNS.forEach(p=>s+=flagSVG(p[0],p[1],p[2],1));
  return s;
}
const TEAM={r:"#D22C3C",b:"#2563C9"};
function flagSVG(x,y,t,k){const c=TEAM[t];return '<g transform="translate('+x+" "+y+") scale("+k+')"><circle r="13" fill="#fff" stroke="'+c+'" stroke-width="2.6"/><path d="M-5,8 V-8" stroke="#1A1C19" stroke-width="2"/><path d="M-5,-8 H7 L4,-4 L7,0 H-5 Z" fill="'+c+'"/></g>'}
function iconSVG(n,size){ // los icoon als <svg>, voor markers en lijsten
  const hq=n==="HQ Rood"?TEAM.r:n==="HQ Blauw"?TEAM.b:null;
  return '<svg viewBox="-18 -18 36 36" width="'+size+'" height="'+size+'" aria-hidden="true"><circle r="16" fill="'+(hq||"#fff")+'" stroke="'+(hq||"#1A1C19")+'" stroke-width="2.2"/><g fill="none" stroke="#1A1C19" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" transform="scale(.92)">'+(ICONS[n]||"")+"</g></svg>";
}
const flagIcon=(t,size)=>'<svg viewBox="-15 -15 30 30" width="'+size+'" height="'+size+'" aria-hidden="true">'+flagSVG(0,0,t,1)+"</svg>";

// gebiedsnamen: als label met vaste grootte op de kaart (niet meeschalen)
function areaMarks(o){
  const m=[{x:298,y:440,html:'<span class="area area-safe">Safe zone</span>',cls:"amk"}];
  if(o.zones!==false)m.push({x:(COLX(14)+COLX(17))/2,y:ROWY(SEMI.r1+1)-14,html:'<span class="area area-semi">Alleen semi-auto</span>',cls:"amk"},{x:DEATHZONE.x,y:DEATHZONE.y,html:'<span class="area area-dz">Deathzone</span>',cls:"amk"});
  if(o.small)m.push({x:SMALL_X/2+20,y:612,html:'<span class="area area-small">Niet op het klein veld</span>',cls:"amk"});
  return m;
}

/* Kaartweergave: vectorkaart met slepen, knijpen, scrollen en dubbeltikken.
   Markers en namen liggen in een HTML-laag erboven en houden een vaste schermgrootte. */
class MapView{
  constructor(el,opt){
    this.o=Object.assign({interactive:true,bounds:[0,0,MAP_W,MAP_H],pad:14,maxS:5,rulers:false,onTap:null,onChange:null},opt||{});
    this.el=el; el.classList.add("mv"); if(!this.o.interactive)el.classList.add("mv-static");
    el.innerHTML='<svg class="mv-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><g class="mv-base"></g><g class="mv-game"></g></svg><div class="mv-ov" aria-hidden="true"></div>'+
      (this.o.rulers?'<div class="mv-rt" aria-hidden="true"></div><div class="mv-rl" aria-hidden="true"></div><div class="mv-rc" aria-hidden="true"></div>':"");
    this.svg=el.querySelector(".mv-svg"); this.baseG=el.querySelector(".mv-base"); this.gameG=el.querySelector(".mv-game"); this.ov=el.querySelector(".mv-ov");
    this.s=1; this.cx=MAP_W/2; this.cy=MAP_H/2; this.w=1; this.h=1; this.marks=[]; this.fitted=false; this.raf=0; this.anim=0; this.lastS=0;
    if(this.o.rulers){
      this.rt=el.querySelector(".mv-rt"); this.rl=el.querySelector(".mv-rl");
      this.rt.innerHTML=Array.from({length:GRID.cols},(_,i)=>"<span>"+String.fromCharCode(65+i)+"</span>").join("");
      this.rl.innerHTML=Array.from({length:GRID.rows},(_,j)=>"<span>"+(j+1)+"</span>").join("");
    }
    this.ro=new ResizeObserver(()=>this.resize()); this.ro.observe(el);
    this.bind();
  }
  destroy(){this.ro.disconnect();cancelAnimationFrame(this.raf);cancelAnimationFrame(this.anim);this.dead=true}
  setBase(html){this.baseG.innerHTML=html}
  setGame(html){this.gameG.innerHTML=html}
  resize(){
    const r=this.el.getBoundingClientRect(); if(!r.width||!r.height)return;
    const was=this.w; this.w=r.width; this.h=r.height;
    if(!this.fitted){this.fitted=true;this.fit(null,0);if(this.o.onReady)this.o.onReady(this);return}
    if(this.o.refit){this.o.refit(this);return}
    if(Math.abs(was-this.w)>1&&this.s<this.minS())this.s=this.minS();
    this.clamp(); this.draw();
  }
  fitS(rect,pad){pad=pad==null?this.o.pad:pad;return Math.min((this.w-2*pad)/(rect[2]-rect[0]),(this.h-2*pad)/(rect[3]-rect[1]))}
  minS(){return this.fitS(this.o.bounds)*.92}
  fit(rect,ms,pad,ins){ // ins: ruimte in px die door knoppen bedekt is {t,r,b,l}
    rect=rect||this.o.bounds; pad=pad==null?this.o.pad:pad; ins=Object.assign({t:0,r:0,b:0,l:0},ins||this.o.insets||{});
    const s=Math.min((this.w-ins.l-ins.r-2*pad)/(rect[2]-rect[0]),(this.h-ins.t-ins.b-2*pad)/(rect[3]-rect[1]));
    return this.to({s,cx:(rect[0]+rect[2])/2-(ins.l-ins.r)/2/s,cy:(rect[1]+rect[3])/2-(ins.t-ins.b)/2/s},ms)}
  clamp(){
    const b=this.o.bounds, lo=this.minS(); this.s=Math.max(lo,Math.min(this.o.maxS,this.s));
    const hw=this.w/2/this.s, hh=this.h/2/this.s;
    // het midden mag niet verder dan de rand van het veld, dan blijft er altijd kaart in beeld
    const f=this.o.tight?1:.2; // tight: beeld blijft helemaal binnen de kaart
    // past de kaart helemaal in beeld, dan mag hij schuiven zolang hij volledig zichtbaar blijft
    this.cx=(b[2]-b[0])<2*hw?Math.max(b[2]-hw,Math.min(b[0]+hw,this.cx)):Math.max(b[0]+hw*f,Math.min(b[2]-hw*f,this.cx));
    this.cy=(b[3]-b[1])<2*hh?Math.max(b[3]-hh,Math.min(b[1]+hh,this.cy)):Math.max(b[1]+hh*f,Math.min(b[3]-hh*f,this.cy));
  }
  to(t,ms){
    cancelAnimationFrame(this.anim); this.ts=Math.max(this.minS(),Math.min(this.o.maxS,t.s));
    if(!ms||matchMedia("(prefers-reduced-motion: reduce)").matches){Object.assign(this,{s:t.s,cx:t.cx,cy:t.cy});this.clamp();this.draw();return Promise.resolve()}
    const a={s:this.s,cx:this.cx,cy:this.cy}, t0=performance.now();
    return new Promise(done=>{const step=now=>{if(this.dead)return;const k=Math.min(1,(now-t0)/ms),e=1-Math.pow(1-k,3);
      this.s=a.s*Math.pow(t.s/a.s,e); this.cx=a.cx+(t.cx-a.cx)*e; this.cy=a.cy+(t.cy-a.cy)*e; this.clamp(); this.paint();
      if(k<1)this.anim=requestAnimationFrame(step);else done()};this.anim=requestAnimationFrame(step)});
  }
  zoomAt(f,px,py,ms){ // inzoomen rond een punt op het scherm
    const m=this.toMap(px,py,true), s=Math.max(this.minS(),Math.min(this.o.maxS,this.s*f));
    const cx=m.x-(px-this.w/2)/s, cy=m.y-(py-this.h/2)/s; return this.to({s,cx,cy},ms);
  }
  toMap(x,y,local){if(!local){const r=this.el.getBoundingClientRect();x-=r.left;y-=r.top}return{x:this.cx+(x-this.w/2)/this.s,y:this.cy+(y-this.h/2)/this.s}}
  toScreen(x,y){return{x:(x-this.cx)*this.s+this.w/2,y:(y-this.cy)*this.s+this.h/2}}
  draw(){if(!this.raf)this.raf=requestAnimationFrame(()=>{this.raf=0;this.paint()})}
  paint(){
    const vw=this.w/this.s, vh=this.h/this.s;
    this.svg.setAttribute("viewBox",(this.cx-vw/2)+" "+(this.cy-vh/2)+" "+vw+" "+vh);
    const mk=Math.round(Math.max(20,Math.min(34,13+17*Math.sqrt(this.s))));
    this.el.style.setProperty("--mk",mk+"px");
    this.el.style.setProperty("--zs",Math.min(1.08,this.s).toFixed(3)); // schaal voor namen die met de kaart meegroeien
    for(const m of this.marks){const p=this.toScreen(m.x,m.y);m.sx=p.x;m.sy=p.y;m.el.style.transform="translate("+p.x.toFixed(1)+"px,"+p.y.toFixed(1)+"px)"}
    this.layoutLabels(mk);
    if(this.rt){
      const rs=this.rt.children; for(let i=0;i<rs.length;i++){const x=(COLX(i)+GRID.cw/2-this.cx)*this.s+this.w/2;rs[i].style.transform="translateX("+x.toFixed(1)+"px)";rs[i].style.opacity=x<30||x>this.w-6?0:1}
      const rl=this.rl.children; for(let j=0;j<rl.length;j++){const y=(ROWY(j)+GRID.ch/2-this.cy)*this.s+this.h/2;rl[j].style.transform="translateY("+y.toFixed(1)+"px)";rl[j].style.opacity=y<30||y>this.h-6?0:1}
      this.el.classList.toggle("mv-dense",GRID.cw*this.s<20);
    }
    if(this.o.onChange)this.o.onChange(this);
  }
  setMarks(list){ // [{x,y,html,cls,label,side,prio,key}]
    this.ov.innerHTML=""; this.marks=list.map(m=>{const el=document.createElement("div");el.className="mk "+(m.cls||"");el.innerHTML=m.html+(m.label?'<span class="mk-l s-'+(m.side||"r")+'">'+esc(m.label)+"</span>":"");
      this.ov.appendChild(el);return Object.assign({},m,{el,lab:el.querySelector(".mk-l")})});
    this.marks.forEach(m=>{if(m.lab){m.lw=m.lab.offsetWidth+2;m.lh=m.lab.offsetHeight}});
    this.forceLabels=true; this.paint();
  }
  layoutLabels(mk){ // namen zonder overlap en binnen beeld: belangrijkste eerst, wat botst valt weg
    if(this.noLabels){this.marks.forEach(m=>{if(m.lab&&m.ls!=="off"){m.ls="off";m.lab.className="mk-l off"}});return}
    const boxes=[], r=mk/2+1, hit=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h, L=this.o.rulers?28:2, T=this.o.rulers?24:2;
    const inView=b=>b.x>=L&&b.y>=T&&b.x+b.w<=this.w-2&&b.y+b.h<=this.h-2;
    this.marks.forEach(m=>boxes.push({x:m.sx-r,y:m.sy-r,w:2*r,h:2*r}));
    const order=this.marks.filter(m=>m.lab).sort((a,b)=>(b.prio||0)-(a.prio||0));
    for(const m of order){
      const x=m.sx, y=m.sy, g=mk/2+4, sides=[m.side||"r","r","l","b","t"]; let placed=null;
      if(x<-60||y<-30||x>this.w+60||y>this.h+30){if(m.ls!=="off"){m.ls="off";m.lab.className="mk-l off"}continue}
      for(const sd of sides){const b=sd==="r"?{x:x+g,y:y-m.lh/2}:sd==="l"?{x:x-g-m.lw,y:y-m.lh/2}:sd==="b"?{x:x-m.lw/2,y:y+g-2}:{x:x-m.lw/2,y:y-g-m.lh+2};
        b.w=m.lw;b.h=m.lh; if(inView(b)&&!boxes.some(o=>hit(o,b))){placed={sd,b};break}}
      const cls=placed?"s-"+placed.sd:"off"; if(placed)boxes.push(placed.b);
      if(m.ls!==cls){m.ls=cls;m.lab.className="mk-l "+cls}
    }
  }
  nearestMark(px,py,maxPx,filter){let best=null;for(const m of this.marks){if(filter&&!filter(m))continue;const d=Math.hypot(m.sx-px,m.sy-py);if(d<=maxPx&&(!best||d<best.d))best={d,m}}return best&&best.m}
  bind(){
    const el=this.el, P=new Map(); let g=null, lastTap=0, lastXY=null;
    el.addEventListener("pointerdown",e=>{
      if(e.button>0)return; el.setPointerCapture(e.pointerId); P.set(e.pointerId,{x:e.clientX,y:e.clientY});
      const r=el.getBoundingClientRect();
      if(P.size===1)g={type:"pan",x0:e.clientX,y0:e.clientY,cx:this.cx,cy:this.cy,t0:performance.now(),moved:0,r};
      else if(P.size===2&&this.o.interactive){const [a,b]=[...P.values()],mx=(a.x+b.x)/2-r.left,my=(a.y+b.y)/2-r.top;g={type:"pinch",d0:Math.hypot(a.x-b.x,a.y-b.y),s0:this.s,m:this.toMap(mx,my,true),moved:99,r}}
    });
    el.addEventListener("pointermove",e=>{
      if(!P.has(e.pointerId)||!g)return; P.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(g.type==="pan"&&P.size===1){const dx=e.clientX-g.x0,dy=e.clientY-g.y0;g.moved=Math.max(g.moved,Math.hypot(dx,dy));
        if(this.o.interactive&&g.moved>4){cancelAnimationFrame(this.anim);this.cx=g.cx-dx/this.s;this.cy=g.cy-dy/this.s;this.clamp();this.draw();el.classList.add("grab")}}
      else if(g.type==="pinch"&&P.size>=2){const [a,b]=[...P.values()],mx=(a.x+b.x)/2-g.r.left,my=(a.y+b.y)/2-g.r.top;
        this.s=Math.max(this.minS(),Math.min(this.o.maxS,g.s0*Math.hypot(a.x-b.x,a.y-b.y)/g.d0));this.cx=g.m.x-(mx-this.w/2)/this.s;this.cy=g.m.y-(my-this.h/2)/this.s;this.clamp();this.draw()}
    });
    const up=e=>{
      if(!P.has(e.pointerId))return; P.delete(e.pointerId); el.classList.remove("grab");
      if(g&&g.type==="pan"&&g.moved<8&&performance.now()-g.t0<600&&!P.size){
        const r=g.r, px=e.clientX-r.left, py=e.clientY-r.top, now=performance.now();
        if(this.o.interactive&&now-lastTap<320&&lastXY&&Math.hypot(px-lastXY[0],py-lastXY[1])<30){lastTap=0;this.zoomAt(2,px,py,260)}
        else{lastTap=now;lastXY=[px,py];if(this.o.onTap)this.o.onTap(this.toMap(px,py,true),{px,py,e})}
      }
      if(!P.size)g=null; else if(P.size===1){const [a]=[...P.values()];g={type:"pan",x0:a.x,y0:a.y,cx:this.cx,cy:this.cy,t0:0,moved:99,r:el.getBoundingClientRect()}}
    };
    el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up);
    if(this.o.interactive){
      // twee vingers: de browser mag niet zelf de pagina zoomen (iPhone negeert dat soms), de kaart doet het
      el.addEventListener("touchmove",e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
      // Safari: eigen knijpgebaar. Werkt als reserve als de browser de pointer-events afbreekt
      let gs=null;
      el.addEventListener("gesturestart",e=>{e.preventDefault();const r=el.getBoundingClientRect();gs={s0:this.s,r,m:this.toMap(e.clientX-r.left,e.clientY-r.top,true)}});
      el.addEventListener("gesturechange",e=>{e.preventDefault();if(!gs||(g&&g.type==="pinch"))return;
        const mx=e.clientX-gs.r.left,my=e.clientY-gs.r.top;cancelAnimationFrame(this.anim);
        this.s=Math.max(this.minS(),Math.min(this.o.maxS,gs.s0*e.scale));this.cx=gs.m.x-(mx-this.w/2)/this.s;this.cy=gs.m.y-(my-this.h/2)/this.s;this.clamp();this.draw()});
      el.addEventListener("gestureend",e=>{e.preventDefault();gs=null});
    }
    el.addEventListener("wheel",e=>{if(!this.o.interactive)return;e.preventDefault();const r=el.getBoundingClientRect();
      cancelAnimationFrame(this.anim);const f=Math.exp(-e.deltaY*(e.ctrlKey?.012:.0016));this.zoomAt(f,e.clientX-r.left,e.clientY-r.top,0)},{passive:false});
  }
}

/* Scores: alles staat op het toestel; de beste score per naam en spel gaat ook naar openbare MQTT-servers.
   Bij elke start stuurt het toestel zijn beste scores opnieuw, zo herstelt de gedeelde ranglijst zichzelf. */
const store={get(k,d){try{const v=localStorage.getItem("baveld."+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem("baveld."+k,JSON.stringify(v))}catch(e){}}};
const nkey=n=>String(n||"").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const DEVICE=(()=>{let d=store.get("device");if(!d){d=Array.from(crypto.getRandomValues(new Uint8Array(6)),b=>b.toString(16).padStart(2,"0")).join("");store.set("device",d)}return d})();

/* ---- kleine MQTT 3.1.1-client over WebSocket (QoS 0) ---- */
function mqttClient(url,onMsg,onState){
  const te=new TextEncoder(), td=new TextDecoder(); let ws=null, buf=new Uint8Array(0), ping=0, alive=false, closed=false, retry=1500, subs=[];
  const varint=n=>{const o=[];do{let b=n%128;n=Math.floor(n/128);if(n>0)b|=128;o.push(b)}while(n>0);return o};
  const str=s=>{const b=te.encode(s);return[b.length>>8,b.length&255,...b]};
  const pkt=(h,body)=>new Uint8Array([h,...varint(body.length),...body]);
  const send=p=>{if(ws&&ws.readyState===1)ws.send(p)};
  function open(){
    if(closed)return; try{ws=new WebSocket(url,"mqtt")}catch(e){return later()}
    ws.binaryType="arraybuffer";
    ws.onopen=()=>{const id="baveld-"+DEVICE+"-"+Math.random().toString(36).slice(2,7);
      send(pkt(0x10,[...str("MQTT"),4,2,0,60,...str(id)]))};
    ws.onmessage=ev=>{const d=new Uint8Array(ev.data),n=new Uint8Array(buf.length+d.length);n.set(buf);n.set(d,buf.length);buf=n;parse()};
    ws.onclose=()=>{alive=false;clearInterval(ping);onState&&onState();later()};
    ws.onerror=()=>{try{ws.close()}catch(e){}};
  }
  function later(){if(!closed)setTimeout(open,retry=Math.min(retry*1.6,30000))}
  function parse(){
    for(;;){
      if(buf.length<2)return; let len=0,mul=1,i=1,b;
      do{if(i>=buf.length)return;b=buf[i++];len+=(b&127)*mul;mul*=128}while(b&128);
      if(buf.length<i+len)return;
      const head=buf[0], type=head>>4, body=buf.slice(i,i+len); buf=buf.slice(i+len);
      if(type===2){alive=true;retry=1500;subs.forEach(t=>send(pkt(0x82,[0,1,...str(t),0])));clearInterval(ping);ping=setInterval(()=>send(new Uint8Array([0xC0,0])),30000);onState&&onState()}
      else if(type===3){const tl=(body[0]<<8)|body[1], topic=td.decode(body.subarray(2,2+tl)), q=(head>>1)&3;onMsg(topic,body.subarray(2+tl+(q?2:0)))}
    }
  }
  open();
  return{subscribe(t){subs.push(t);if(alive)send(pkt(0x82,[0,1,...str(t),0]))},
    publish(topic,payload,retain){const p=typeof payload==="string"?te.encode(payload):payload;send(pkt(0x30|(retain?1:0),[...str(topic),...p]))},
    get alive(){return alive}, close(){closed=true;clearInterval(ping);try{ws.close()}catch(e){}}};
}

const Scores=(()=>{
  const ROOT="ba-veld/v1/score/", RESET="ba-veld/v1/reset", BROKERS=["wss://broker.emqx.io:8084/mqtt","wss://broker.hivemq.com:8884/mqtt","wss://test.mosquitto.org:8081/mqtt"];
  let runs=store.get("runs",[]);              // eigen potjes: {n,mode,score,avg,sec,ts,max}
  let remote=store.get("remote",{});          // laatst bekende online scores: topic -> rij
  const listeners=new Set(); let clients=[], lastBroadcast=0;
  const REF=/raymond/i; // namen met "Raymond" (de maker) tellen niet mee voor de plekken; zijn beste score staat apart onder de ranglijst
  /* Beheer: alles wissen. Het wis-bericht is ondertekend met de beheercode (ECDSA P-256);
     elk toestel controleert de handtekening met de publieke sleutel hieronder. Zonder code kan niemand wissen. */
  const ADMIN={kty:"EC",crv:"P-256",x:"IKeyFt1rgTZNTnCbVyz_YypRRDNSaJpeRp25j9Bbapw",y:"ho0zAvhct_htWWMfqC8eFwTpIU3sx8jzeQER5Vp-YzE"};
  let reset=store.get("reset",{t:0,sig:""});  // laatste geldige wis-actie: alles van vóór t telt niet meer
  const after=r=>(+r.ts||0)>reset.t;
  const b64=u=>btoa(String.fromCharCode(...new Uint8Array(u))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  const unb64=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
  const resetText=t=>new TextEncoder().encode("ba-veld-reset:"+t);
  const ALG={name:"ECDSA",namedCurve:"P-256"}, SIG={name:"ECDSA",hash:"SHA-256"};
  let pubKey=null;
  async function validReset(t,sig){
    try{pubKey=pubKey||await crypto.subtle.importKey("jwk",ADMIN,ALG,false,["verify"]);return await crypto.subtle.verify(SIG,pubKey,unb64(sig),resetText(t))}catch(e){return false}
  }
  async function signReset(code,t){
    try{const k=await crypto.subtle.importKey("jwk",Object.assign({d:String(code).trim()},ADMIN),ALG,false,["sign"]);
      const sig=b64(await crypto.subtle.sign(SIG,k,resetText(t)));return await validReset(t,sig)?sig:null}catch(e){return null}
  }
  function applyReset(t,sig){
    if(!(t>reset.t))return; reset={t,sig}; store.set("reset",reset);
    const gone={}; runs.forEach(r=>{if(!after(r))gone[r.mode+"|"+nkey(r.n)]=r});
    runs=runs.filter(after); store.set("runs",runs);
    Object.keys(remote).forEach(k=>{if(!after(remote[k]))delete remote[k]}); store.set("remote",remote);
    // online opruimen: per naam de nieuwe beste (als die er is) of leeg
    Object.values(gone).forEach(r=>{if(bestOf(r.mode,r.n))publish(r.mode,r.n);else clients.forEach(c=>c.alive&&c.publish(topicOf(r.mode,r.n),new Uint8Array(0),true))});
    emit();
  }
  const emit=()=>listeners.forEach(f=>f());
  const better=(a,b)=>b.score-a.score||a.sec-b.sec||a.ts-b.ts; // hoogste score, bij gelijk: snelste tijd
  const topicOf=(mode,name)=>ROOT+mode+"/"+DEVICE+"-"+encodeURIComponent(nkey(name)).slice(0,120);
  function bestOf(mode,name){return runs.filter(r=>r.mode===mode&&nkey(r.n)===nkey(name)).sort(better)[0]||null}
  function myNames(){const seen={},out=[];runs.slice().sort((a,b)=>b.ts-a.ts).forEach(r=>{const k=nkey(r.n);if(!seen[k]){seen[k]=1;out.push(r.n)}});return out}
  function publish(mode,name){
    const b=bestOf(mode,name); if(!b)return;
    const msg=JSON.stringify({n:b.n,score:b.score,avg:b.avg,sec:b.sec,ts:b.ts,max:b.max,dev:b.dev||""});
    clients.forEach(c=>c.alive&&c.publish(topicOf(mode,name),msg,true));
  }
  function broadcastAll(){ // zelfherstel: de laatste wis-actie en alle eigen beste scores opnieuw sturen
    if(reset.t)clients.forEach(c=>c.alive&&c.publish(RESET,JSON.stringify(reset),true));
    const seen={}; runs.forEach(r=>{const k=r.mode+"|"+nkey(r.n);if(!seen[k]){seen[k]=1;publish(r.mode,r.n)}});
  }
  function onMsg(topic,payload){
    if(topic===RESET){try{const m=JSON.parse(new TextDecoder().decode(payload));
      if(m.t>reset.t&&m.t<Date.now()+864e5&&typeof m.sig==="string")validReset(m.t,m.sig).then(ok=>ok&&applyReset(m.t,m.sig))}catch(e){}return}
    if(!topic.startsWith(ROOT))return; let row=null;
    if(payload.length){try{row=JSON.parse(new TextDecoder().decode(payload))}catch(e){return}}
    if(!row){if(remote[topic]){delete remote[topic];save()}return}
    const mode=topic.slice(ROOT.length).split("/")[0];
    if(!after(row)){if(remote[topic]){delete remote[topic];save()}return} // van vóór de laatste wis-actie
    if(typeof row.n!=="string"||!(row.score>=0)||row.score>(row.max||34000)||row.score>34000||!(row.sec>=0))return; // grove controle
    remote[topic]={n:String(row.n).slice(0,16),mode,score:Math.round(row.score),avg:+row.avg||0,sec:+row.sec||0,ts:+row.ts||0,dev:/^[mtc]$/.test(row.dev)?row.dev:"",mine:topic.includes("/"+DEVICE+"-")};
    save();
  }
  let saveT=0; function save(){clearTimeout(saveT);saveT=setTimeout(()=>{store.set("remote",remote);emit()},150)}
  function connect(){
    if(clients.length)return;
    clients=BROKERS.map(u=>mqttClient(u,onMsg,()=>{emit();if(Date.now()-lastBroadcast>4000&&clients.some(c=>c.alive)){lastBroadcast=Date.now();setTimeout(broadcastAll,800)}}));
    clients.forEach(c=>{c.subscribe(RESET);c.subscribe(ROOT+"#")});
  }
  function disconnect(){ // slapen: verbindingen dicht; bij connect() komt alles weer binnen (de servers bewaren de scores)
    if(!clients.length)return; const old=clients; clients=[]; old.forEach(c=>c.close()); emit();
  }
  return{
    connect, disconnect, on(f){listeners.add(f);return()=>listeners.delete(f)},
    get online(){return clients.some(c=>c.alive)},
    add(run){runs.push(run);
      // per naam en spel: laatste 20 potjes en altijd de beste
      const keep=new Set(), g={}; runs.forEach(r=>{const k=r.mode+"|"+nkey(r.n);(g[k]=g[k]||[]).push(r)});
      Object.values(g).forEach(a=>{a.slice().sort((x,y)=>y.ts-x.ts).slice(0,20).forEach(r=>keep.add(r));keep.add(a.slice().sort(better)[0])});
      runs=runs.filter(r=>keep.has(r)); store.set("runs",runs); publish(run.mode,run.n); emit();
    },
    best:bestOf, myNames,
    history(mode,name){return runs.filter(r=>r.mode===mode&&nkey(r.n)===nkey(name)).sort((a,b)=>a.ts-b.ts)},
    board(mode){ // één regel per naam: de beste, van dit toestel en online samen
      const all=runs.filter(r=>r.mode===mode&&after(r)).map(r=>Object.assign({mine:true},r)).concat(Object.values(remote).filter(r=>r.mode===mode&&after(r)));
      const best={}; all.sort(better).forEach(r=>{const k=nkey(r.n);if(!best[k])best[k]=r});
      let k=0; // plek telt alleen spelers die meedingen
      return Object.values(best).sort(better).map(r=>{const ref=REF.test(r.n);return Object.assign({},r,{ref,rank:ref?0:++k})});
    },
    isRef:n=>REF.test(n),
    get lastReset(){return reset.t},
    checkCode(code){return signReset(code,Date.now()).then(Boolean)},
    async resetAll(code){ // beheer: alle scores van iedereen wissen
      if(!clients.some(c=>c.alive))return "offline";
      const t=Date.now(), sig=await signReset(code,t); if(!sig)return "code";
      const msg=JSON.stringify({t,sig}); clients.forEach(c=>c.alive&&c.publish(RESET,msg,true));
      applyReset(t,sig); return "ok";
    },
    clearMine(){ // eigen scores wissen, hier en online
      const seen={}; runs.forEach(r=>{const k=r.mode+"|"+nkey(r.n);if(!seen[k]){seen[k]=1;clients.forEach(c=>c.alive&&c.publish(topicOf(r.mode,r.n),new Uint8Array(0),true))}});
      Object.keys(remote).forEach(t=>{if(remote[t].mine)delete remote[t]}); runs=[]; store.set("runs",runs); store.set("remote",remote); emit();
    }
  };
})();

/* ---------- hulpjes ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const plural=(n,a,b)=>n+" "+(n===1?a:b);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nlN=x=>Number(x).toLocaleString("nl-NL");
const nlS=x=>(Math.round(x*100)/100).toFixed(2).replace(".",",");
const mmss=s=>{if(s==null)return"–";const c=Math.round(s*100),m=Math.floor(c/6000),r=c-m*6000;return m+":"+String(Math.floor(r/100)).padStart(2,"0")+","+String(r%100).padStart(2,"0")};
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
const isPhone=()=>matchMedia("(max-width:760px)").matches;
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("on"),2600)}
function searchLocs(q,max){ // begin van de naam eerst, dan begin van een woord, dan ergens in de naam
  q=norm(q); if(!q)return[]; const qs=q.replace(/ /g,"");
  return LOCS.map(l=>{const n=norm(l.n),ns=n.replace(/ /g,"");let s=-1;if(n.startsWith(q))s=0;else if((" "+n).includes(" "+q))s=1;else if(n.includes(q))s=2;else if(ns.includes(qs))s=3;return{l,s}})
    .filter(x=>x.s>=0).sort((a,b)=>a.s-b.s||a.l.n.localeCompare(b.l.n)).slice(0,max||6).map(x=>x.l);
}
const IC={
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>',
  games:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8.5"/><path d="M12 8.2 15.6 14.5H8.4Z" fill="currentColor" stroke="none"/></svg>',
  rank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 20h18M5 20v-6h4.5v6M9.5 20V8h5v12M14.5 20v-9H19v9"/></svg>',
  search:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  fit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
  tilt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 5h10l4 14H3L7 5Z"/><path d="M12 5v14M5 12h14"/></svg>',
  north:'<svg viewBox="0 0 24 24"><path d="M12 3 17 20l-5-3.2L7 20 12 3Z" fill="currentColor"/></svg>'
};
const LOGO='<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="11" fill="none" stroke="var(--op)" stroke-width="3.4"/><path d="M15 9 20.6 18.6H9.4Z" fill="currentColor"/></svg>';

/* ---------- schil en navigatie ---------- */
const ROUTES=[["kaart","Kaart",IC.map],["spellen","Spellen",IC.games],["ranglijst","Ranglijst",IC.rank]];
function shell(){
  $("#app").innerHTML='<header class="bar"><a class="brand" href="#kaart">'+LOGO+'<span>B&amp;A Veld</span></a><nav class="tabs" aria-label="Hoofdmenu">'+
    ROUTES.map(r=>'<a href="#'+r[0]+'" data-r="'+r[0]+'">'+r[1]+"</a>").join("")+'</nav><span class="live" id="live"><i></i><span></span></span></header>'+
    '<main id="view"></main><nav class="tabbar" aria-label="Hoofdmenu">'+ROUTES.map(r=>'<a href="#'+r[0]+'" data-r="'+r[0]+'">'+r[2]+"<span>"+r[1]+"</span></a>").join("")+"</nav>";
}
function liveBadge(){const on=Scores.online, el=$("#live"); if(!el)return; el.classList.toggle("on",on); el.lastChild.textContent=on?"Ranglijst live":"Offline";}
let route="", cleanup=null;
function go(){
  const r=(location.hash.replace(/^#\/?/,"")||"kaart").split("/")[0];
  const PAGES={kaart:pageMap,spellen:pageGames,ranglijst:pageRank,beheer:pageAdmin}; // beheer staat bewust niet in het menu
  if(!PAGES[r]){location.hash="#kaart";return}
  if(cleanup){cleanup();cleanup=null}
  route=r;
  $$("[data-r]").forEach(a=>{if(a.dataset.r===r)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  const v=$("#view"); v.className=""; v.scrollTop=0;
  PAGES[r](v);
  document.title=({kaart:"Kaart",spellen:"Spellen",ranglijst:"Ranglijst",beheer:"Beheer"})[r]+" · B&A Veld";
}

/* ---------- kaart ---------- */
const MAPPREF=Object.assign({names:"alle",grid:true,zones:true,field:"groot",view:"2d"},store.get("mappref",{}));
if(typeof MAPPREF.names!=="string")MAPPREF.names=MAPPREF.names===false?"uit":"alle"; // oude instelling (aan/uit) omzetten
const saveMapPref=()=>store.set("mappref",MAPPREF);
function pageMap(v){
  v.className="full";
  v.innerHTML='<section class="v-map"><div id="mv"></div><div id="m3" class="map3d" hidden></div><div class="map-ui">'+
    '<div class="search" role="search"><div class="field">'+IC.search+'<input id="q" type="search" placeholder="Zoek een locatie" autocomplete="off" spellcheck="false" aria-label="Zoek een locatie" aria-controls="qres"><button class="clear" id="qx" aria-label="Wissen" hidden>×</button></div><div class="results" id="qres" role="listbox"></div></div>'+
    '<div class="seg viewsw" role="group" aria-label="Weergave"><button data-view="2d">Kaart</button><button data-view="3d">3D</button></div>'+
    '<div class="ctrls" id="ctrl2d"><div class="ctrl-group"><button class="icon-btn" id="zin" aria-label="Inzoomen">'+IC.plus+'</button><button class="icon-btn" id="zout" aria-label="Uitzoomen">'+IC.minus+'</button></div><button class="icon-btn" id="zfit" aria-label="Hele veld">'+IC.fit+'</button><button class="icon-btn" id="lay" aria-label="Lagen" aria-expanded="false">'+IC.layers+'</button></div>'+
    '<div class="layers" id="layers" hidden><h3>Namen</h3><div class="seg" role="group" aria-label="Namen"><button data-names="alle">Alle</button><button data-names="past">Wat past</button><button data-names="uit">Uit</button></div>'+
    '<h3 class="lh2">Op de kaart</h3>'+[["grid","Vakken"],["zones","Zones"]].map(t=>'<label class="tgl">'+t[1]+'<input type="checkbox" data-pref="'+t[0]+'"'+(MAPPREF[t[0]]?" checked":"")+"></label>").join("")+
    '<div class="seg" role="group" aria-label="Veld"><button data-field="groot">Groot veld</button><button data-field="klein">Klein veld</button></div></div>'+
    '<div class="loc" id="loc" hidden></div></div></section>';
  let sel=null;
  const mv=new MapView($("#mv"),{rulers:true,pad:34,bounds:[GRID.x0-16,GRID.y0-16,COLX(GRID.cols)+16,ROWY(GRID.rows)+16],maxS:6,
    insets:isPhone()?{t:64,r:0,b:0,l:0}:{t:96,r:60,b:0,l:0},
    onReady:m=>{m.fit(FIELD_BOX,0,isPhone()?8:20);
      // alle namen op een smal scherm: start op leesbare grootte, linksboven in het veld (schuif voor de rest)
      if(MAPPREF.names==="alle"&&isPhone()&&m.s<.68){const s=.72;m.to({s,cx:FIELD_BOX[0]-6+(m.w/2-30)/s,cy:FIELD_BOX[1]-10+(m.h/2-74)/s},0)}},
    onTap:(p,t)=>{let k=null;
      if(MAPPREF.names==="alle"&&t.e){const X=t.e.clientX,Y=t.e.clientY; // tik op een label telt, ook op de tekst
        k=mv.marks.slice().reverse().find(m=>{if(!m.loc)return false;const b=m.el.firstElementChild.getBoundingClientRect();return X>=b.left-3&&X<=b.right+3&&Y>=b.top-3&&Y<=b.bottom+3})}
      k=k||mv.nearestMark(t.px,t.py,28,m=>m.loc);select(k?k.loc:null)}});
  const drawBase=()=>mv.setBase(baseMapSVG({grid:MAPPREF.grid,zones:MAPPREF.zones,small:MAPPREF.field==="klein"}));
  const drawMarks=()=>{const all=MAPPREF.names==="alle"; mv.noLabels=MAPPREF.names==="uit"; $("#mv").classList.toggle("all-names",all);
    const dim=l=>MAPPREF.field==="klein"&&!inSmall(l)?" dim":"";
    mv.setMarks(areaMarks({zones:MAPPREF.zones,small:MAPPREF.field==="klein"}).concat(LOCS.map(l=>all
      ? {x:l.x,y:l.y,html:'<span class="ml s-'+(l.n==="Winkels"?"c":l.side)+'">'+iconSVG(l.n,36)+"<b>"+esc(l.n)+"</b></span>",loc:l,cls:"nmk"+(sel===l?" sel":"")+dim(l)} // naam en icoon als één label, groeit mee met de kaart
      : {x:l.x,y:l.y,html:iconSVG(l.n,36),label:l.n,side:l.side,prio:sel===l?9:1,loc:l,cls:(sel===l?"sel":"")+dim(l)}),
      SPAWNS.map(p=>({x:p[0],y:p[1],html:flagIcon(p[2],30),cls:"flag"}))))};
  drawBase(); drawMarks();
  function select(l,fly){
    sel=l; drawMarks(); const box=$("#loc");
    if(!l){box.hidden=true;$(".v-map").style.setProperty("--loc-h","0px");return}
    const red=SPAWNS.filter(p=>p[2]==="r").map(p=>GEO.meters(l,{x:p[0],y:p[1]})), blue=SPAWNS.filter(p=>p[2]==="b").map(p=>GEO.meters(l,{x:p[0],y:p[1]}));
    box.innerHTML='<button class="loc-x" aria-label="Sluiten">×</button><div class="loc-h">'+iconSVG(l.n,46)+'<div><h2 class="disp">'+esc(l.n)+'</h2><div class="muted">Vak <b class="cell">'+cellCode(l.x,l.y)+"</b></div></div></div>"+
      '<div class="loc-chips">'+(inSmall(l)?'<span class="chip">Klein en groot veld</span>':'<span class="chip">Alleen groot veld</span>')+(inSemi(l)?'<span class="chip warn">Alleen semi-auto</span>':"")+"</div>"+
      '<dl><dt>Respawn rood</dt><dd class="num">'+Math.round(Math.min(...red))+' m</dd><dt>Respawn blauw</dt><dd class="num">'+Math.round(Math.min(...blue))+" m</dd></dl>";
    box.hidden=false; box.querySelector(".loc-x").onclick=()=>select(null); $(".v-map").style.setProperty("--loc-h",box.offsetHeight+"px");
    if(fly){const s=Math.max(mv.s,mv.fitS(FIELD_BOX,20)*2.4);mv.to({s,cx:l.x,cy:l.y+(isPhone()?70/s:0)},420)}
  }
  // zoeken
  const q=$("#q"), res=$("#qres"); let hi=0, list=[];
  const showRes=()=>{list=searchLocs(q.value,7); hi=Math.min(hi,Math.max(0,list.length-1)); $("#qx").hidden=!q.value;
    res.innerHTML=!q.value.trim()?"":list.length?list.map((l,i)=>'<button class="res'+(i===hi?" on":"")+'" role="option" data-n="'+esc(l.n)+'">'+iconSVG(l.n,28)+"<b>"+esc(l.n)+'</b><span class="cell">'+cellCode(l.x,l.y)+"</span></button>").join(""):'<div class="res-empty">Geen locatie gevonden</div>'};
  const pick=n=>{const l=LOCS.find(x=>x.n===n);if(!l)return;q.value="";showRes();q.blur();select(l,true)};
  q.addEventListener("input",()=>{hi=0;showRes()});
  q.addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();hi=(hi+(e.key==="ArrowDown"?1:-1)+list.length)%Math.max(1,list.length);showRes()}
    else if(e.key==="Enter"&&list.length){e.preventDefault();pick(list[hi].n)}else if(e.key==="Escape"){q.value="";showRes();q.blur()}});
  res.addEventListener("click",e=>{const b=e.target.closest("[data-n]");if(b)pick(b.dataset.n)});
  $("#qx").onclick=()=>{q.value="";showRes();q.focus()};
  // bediening
  $("#zin").onclick=()=>mv.zoomAt(1.6,mv.w/2,mv.h/2,220); $("#zout").onclick=()=>mv.zoomAt(1/1.6,mv.w/2,mv.h/2,220);
  $("#zfit").onclick=()=>mv.fit(FIELD_BOX,380,isPhone()?8:20);
  const lay=$("#layers"); $("#lay").onclick=()=>{lay.hidden=!lay.hidden;$("#lay").setAttribute("aria-expanded",!lay.hidden)};
  lay.addEventListener("change",e=>{const k=e.target.dataset.pref;if(!k)return;MAPPREF[k]=e.target.checked;saveMapPref();drawBase();drawMarks()});
  const segSync=()=>{$$("[data-names]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.names===MAPPREF.names));$$("[data-field]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.field===MAPPREF.field));$$("[data-view]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.view===MAPPREF.view))};
  lay.addEventListener("click",e=>{const n=e.target.closest("[data-names]");if(n){MAPPREF.names=n.dataset.names;saveMapPref();segSync();drawMarks();return}
    const b=e.target.closest("[data-field]");if(!b)return;MAPPREF.field=b.dataset.field;saveMapPref();segSync();drawBase();drawMarks()});
  const closeLay=e=>{if(!lay.hidden&&!e.target.closest("#layers,#lay")){lay.hidden=true;$("#lay").setAttribute("aria-expanded","false")}if(!e.target.closest(".search")&&res.innerHTML&&document.activeElement!==q){}};
  document.addEventListener("pointerdown",closeLay);
  // 2D / 3D
  let m3=null;
  const setView=w=>{MAPPREF.view=w;saveMapPref();segSync();const is3=w==="3d";$("#mv").hidden=is3;$("#m3").hidden=!is3;$("#ctrl2d").hidden=is3;lay.hidden=true;
    if(is3&&!m3)m3=Map3D($("#m3"),l=>select(l)); if(!is3)mv.draw()};
  $(".viewsw").addEventListener("click",e=>{const b=e.target.closest("[data-view]");if(b)setView(b.dataset.view)});
  segSync(); if(MAPPREF.view==="3d")setView("3d");
  cleanup=()=>{mv.destroy();document.removeEventListener("pointerdown",closeLay);if(m3)m3.destroy()};
}

/* ---------- 3D luchtfoto (MapLibre + PDOK), alleen met internet ---------- */
let MLP=null;
function loadML(){
  if(window.maplibregl)return Promise.resolve(); if(MLP)return MLP;
  const U="https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/";
  return MLP=new Promise((ok,no)=>{const l=document.createElement("link");l.rel="stylesheet";l.href=U+"maplibre-gl.css";document.head.appendChild(l);
    const s=document.createElement("script");s.src=U+"maplibre-gl.js";s.onload=ok;s.onerror=()=>{MLP=null;s.remove();no()};document.head.appendChild(s)});
}
function Map3D(box,onPick){
  let map=null, dead=false;
  box.innerHTML='<div class="m3-msg">Luchtfoto laden…</div>';
  const host=document.createElement("div"); host.className="m3-host";
  const ll=(x,y)=>{const g=GEO.toGeo(x,y);return[g.lon,g.lat]};
  const field=FIELD.map(p=>ll(p[0],p[1])); field.push(field[0]);
  const bearing=GEO.bearing();
  const F=(kind,type,coordinates)=>({type:"Feature",properties:{kind},geometry:{type,coordinates}});
  const zones=[F("veld","LineString",field),F("safe","Polygon",[SAFE.map(p=>ll(p[0],p[1])).concat([ll(SAFE[0][0],SAFE[0][1])])]),
    F("semi","Polygon",[[[COLX(SEMI.c0),ROWY(SEMI.r0)],[COLX(SEMI.c1+1),ROWY(SEMI.r0)],[COLX(SEMI.c1+1),ROWY(SEMI.r1+1)],[COLX(SEMI.c0),ROWY(SEMI.r1+1)],[COLX(SEMI.c0),ROWY(SEMI.r0)]].map(p=>ll(p[0],p[1]))])];
  const fit=ms=>{if(!map)return;const b=new maplibregl.LngLatBounds(field[0],field[0]);field.forEach(p=>b.extend(p));
    const c=map.cameraForBounds(b,{padding:isPhone()?{top:76,bottom:24,left:14,right:14}:{top:110,bottom:50,left:70,right:90},bearing})||{};map.easeTo({center:c.center,zoom:(c.zoom||16)+(isPhone()?-.05:.2),bearing,pitch:48,duration:ms})};
  loadML().then(()=>{
    if(dead)return; box.innerHTML=""; box.appendChild(host);
    const PD="https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=Actueel_ortho25&STYLE=&FORMAT=image/jpeg&tileMatrixSet=EPSG:3857&tileMatrix={z}&tileRow={y}&tileCol={x}";
    map=new maplibregl.Map({container:host,attributionControl:{compact:true},maxPitch:78,maxZoom:21,center:field[0],zoom:16,bearing,pitch:48,dragRotate:false,
      style:{version:8,sources:{lf:{type:"raster",tiles:[PD],tileSize:256,maxzoom:19,attribution:"Luchtfoto © PDOK / Beeldmateriaal Nederland"},z:{type:"geojson",data:{type:"FeatureCollection",features:zones}}},
        layers:[{id:"bg",type:"background",paint:{"background-color":"#cfd8c4"}},{id:"lf",type:"raster",source:"lf"},
          {id:"zf",type:"fill",source:"z",filter:["in",["get","kind"],["literal",["safe","semi"]]],paint:{"fill-color":["match",["get","kind"],"safe","#B4237A","#D9711B"],"fill-opacity":.2}},
          {id:"zl",type:"line",source:"z",paint:{"line-color":["match",["get","kind"],"veld","#ffffff","safe","#E35BA9","#F0913A"],"line-width":["match",["get","kind"],"veld",3,2.5],"line-dasharray":["match",["get","kind"],"semi",["literal",[3,2]],["literal",[1,0]]]}}]}});
    // rechtermuisknop (of Ctrl + slepen): links/rechts draait, op/neer kantelt; overal op de kaart even
    const cv=map.getCanvasContainer(); let r=null;
    cv.addEventListener("contextmenu",e=>e.preventDefault());
    cv.addEventListener("mousedown",e=>{if(e.button!==2&&!(e.button===0&&e.ctrlKey))return;e.preventDefault();e.stopPropagation();r={x:e.clientX,y:e.clientY,b:map.getBearing(),p:map.getPitch()};map.dragPan.disable()},true);
    const mm=e=>{if(r)map.jumpTo({bearing:r.b+(e.clientX-r.x)*.4,pitch:Math.max(0,Math.min(78,r.p-(e.clientY-r.y)*.3))})}, mu=()=>{if(r){r=null;map.dragPan.enable()}};
    window.addEventListener("mousemove",mm); window.addEventListener("mouseup",mu); box._off=()=>{window.removeEventListener("mousemove",mm);window.removeEventListener("mouseup",mu)};
    const mk=(html,lnglat,cls)=>{const el=document.createElement("div");el.className="m3-mk "+(cls||"");el.innerHTML=html;return new maplibregl.Marker({element:el,anchor:"top"}).setLngLat(lnglat).addTo(map)};
    LOCS.forEach(l=>{const m=mk(iconSVG(l.n,30)+"<span>"+esc(l.n)+"</span>",ll(l.x,l.y));m.getElement().style.marginTop="-15px";m.getElement().style.pointerEvents="auto";m.getElement().style.cursor="pointer";m.getElement().addEventListener("click",()=>onPick&&onPick(l))});
    SPAWNS.forEach(p=>{const m=mk(flagIcon(p[2],26),ll(p[0],p[1]));m.getElement().style.marginTop="-13px"});
    const lab=()=>box.classList.toggle("nolab",map.getZoom()<17.4); map.on("zoom",lab); lab();
    const ui=document.createElement("div"); ui.className="m3-ui";
    ui.innerHTML='<div class="ctrl-group"><button class="icon-btn" data-a="in" aria-label="Inzoomen">'+IC.plus+'</button><button class="icon-btn" data-a="out" aria-label="Uitzoomen">'+IC.minus+'</button></div><button class="icon-btn" data-a="tilt" aria-label="Kantelen">'+IC.tilt+'</button><button class="icon-btn" data-a="north" aria-label="Noorden boven">'+IC.north+'</button><button class="icon-btn" data-a="fit" aria-label="Hele veld">'+IC.fit+"</button>";
    box.appendChild(ui);
    ui.addEventListener("click",e=>{const a=(e.target.closest("[data-a]")||{}).dataset||{};
      if(a.a==="in")map.zoomIn(); if(a.a==="out")map.zoomOut(); if(a.a==="fit")fit(800);
      if(a.a==="tilt")map.easeTo({pitch:map.getPitch()<10?55:0,duration:600});
      if(a.a==="north")map.easeTo({bearing:Math.abs(map.getBearing())>1?0:bearing,duration:600})});
    fit(0);
    // geen enkele luchtfoto-tegel binnen? dan melden in plaats van een lege kaart te tonen
    let tiles=false; map.on("sourcedata",e=>{if(e.sourceId==="lf"&&e.tile&&e.tile.state==="loaded")tiles=true});
    setTimeout(()=>{if(!dead&&!tiles&&!box.hidden)toast("De luchtfoto laadt niet. Controleer je internetverbinding.")},8000);
  }).catch(()=>{if(!dead)box.innerHTML='<div class="m3-msg">De 3D-kaart heeft internet nodig. Zonder bereik werkt de gewone kaart wel.</div>'});
  return{destroy(){dead=true;if(box._off)box._off();if(map)map.remove()}};
}

/* ---------- spellen ---------- */
const LEN=()=>store.get("len","10")==="all"?"all":"10";
function lenSeg(){const l=LEN(); // keuze met titel en onderregel
  return '<div class="seg len-sw" role="group" aria-label="Vrij spel of competitie"><button data-len="10" aria-pressed="'+(l==="10")+'"><b>Vrij spel</b><small>10 locaties</small></button><button data-len="all" aria-pressed="'+(l==="all")+'"><b>Competitie</b><small>alle '+LOCS.length+" locaties</small></button></div>"}
// competitiestand: per speler de beste score per spel (alle 34) opgeteld; een spel dat nog niet gespeeld is telt als 0
function totalBoard(){
  const per={};
  GAMES.forEach(g=>Scores.board(g.id+"-all").forEach(r=>{const k=r.ref?"#maker":nkey(r.n), p=per[k]||(per[k]={n:r.n,ts:0,score:0,sec:0,parts:{},secs:{},devs:{},mine:false,ref:r.ref});
    if(p.parts[g.id]!=null&&p.parts[g.id]>=r.score)return; // maker met meerdere namen: per spel de beste
    p.score+=r.score-(p.parts[g.id]||0); p.sec+=(+r.sec||0)-(p.secs[g.id]||0); p.parts[g.id]=r.score; p.secs[g.id]=+r.sec||0; p.devs[g.id]=r.dev;
    p.mine=p.mine||!!r.mine; if(r.ts>p.ts){p.ts=r.ts;p.n=r.n}}));
  let k=0; return Object.values(per).sort((a,b)=>b.score-a.score||a.sec-b.sec||a.ts-b.ts).map(r=>Object.assign(r,{played:Object.keys(r.parts).length,rank:r.ref?0:++k}));
}
const totalOf=name=>name?totalBoard().find(r=>Scores.isRef(name)?r.ref:(!r.ref&&nkey(r.n)===nkey(name))):null;
function totalRow(r,i,me){const you=me>=0&&i===me;
  return '<li class="'+(r.ref?"hc":r.rank<=3?"m"+r.rank:"")+(you?" you":"")+'"><span class="rk">'+(r.ref?"":r.rank)+'</span><span class="nm"><b>'+esc(r.ref?"Raymond":r.n)+devIcons(GAMES.map(g=>r.devs[g.id]))+(you?'<i class="tag">jij</i>':"")+'</b><small class="parts">'+
    GAMES.map((g,j)=>{const v=r.parts[g.id];return '<span'+(v==null?' class="no"':"")+' title="'+g.title+'"><i>'+(j+1)+"</i>"+(v==null?"–":nlN(v))+"</span>"}).join("")+'</small></span><span class="sc">'+nlN(r.score)+"</span></li>"}
function totalHTML(max){
  const rows=totalBoard(), name=store.get("lastName",""), me=rows.findIndex(r=>r.mine&&!r.ref&&nkey(r.n)===nkey(name));
  if(!rows.length)return '<div class="empty">Nog geen scores in de competitie. Speel een spel in de competitie om erin te komen.</div>';
  const ranked=rows.map((r,i)=>[r,i]).filter(([r])=>!r.ref);
  let h=ranked.length?'<ol class="rank">'+ranked.slice(0,max).map(([r,i])=>totalRow(r,i,me)).join("")+"</ol>":'<div class="empty">Nog geen scores van spelers in de competitie.</div>';
  const mine=ranked.slice(max).find(([r,i])=>i===me); if(mine)h+='<ol class="rank rank-me">'+totalRow(mine[0],mine[1],me)+"</ol>";
  if(ranked.length>max)h+='<button class="btn all" data-all="total">Hele lijst ('+ranked.length+")</button>";
  const mk=rows.find(r=>r.ref); if(mk)h+='<div class="hc-box"><span class="hc-h">Score van de maker</span><ol class="rank">'+totalRow(mk,-1,-1)+"</ol></div>";
  return h;
}
function gameArt(id){ // een stukje echte veldkaart met de postsymbolen van het spel
  const vb=id==="plek"?"70 600 420 262":id==="naam"?"470 60 420 262":"70 62 420 262";
  const near=LOCS.filter(l=>{const p=vb.split(" ").map(Number);return l.x>p[0]+14&&l.x<p[0]+p[2]-14&&l.y>p[1]+14&&l.y<p[1]+p[3]-14});
  let o="";
  if(id==="tik")o=near.map((l,i)=>'<circle cx="'+l.x+'" cy="'+l.y+'" r="17" fill="none" stroke="#B4237A" stroke-width="'+(i===2?5:3.4)+'"/>').join("")+(near[2]?'<circle cx="'+near[2].x+'" cy="'+near[2].y+'" r="27" fill="none" stroke="#B4237A" stroke-width="2" stroke-dasharray="4 4"/>':"");
  if(id==="naam"){const t=near[3]||near[0];o=near.map(l=>'<circle cx="'+l.x+'" cy="'+l.y+'" r="15" fill="none" stroke="#1A1C19" stroke-opacity=".35" stroke-width="2.4"/>').join("")+'<circle cx="'+t.x+'" cy="'+t.y+'" r="30" fill="#B4237A" fill-opacity=".14"/><circle cx="'+t.x+'" cy="'+t.y+'" r="17" fill="#fff" stroke="#B4237A" stroke-width="5"/><text x="'+t.x+'" y="'+(t.y+7)+'" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="800" font-size="20" fill="#B4237A">?</text>'}
  if(id==="plek"){const t=near[1]||near[0];o='<line x1="'+(t.x-70)+'" y1="'+(t.y+52)+'" x2="'+t.x+'" y2="'+t.y+'" stroke="#1A1C19" stroke-width="3" stroke-dasharray="7 6"/><circle cx="'+t.x+'" cy="'+t.y+'" r="17" fill="none" stroke="#2E7D4F" stroke-width="5"/><g stroke="#B4237A" stroke-width="6" stroke-linecap="round"><line x1="'+(t.x-82)+'" y1="'+(t.y+40)+'" x2="'+(t.x-58)+'" y2="'+(t.y+64)+'"/><line x1="'+(t.x-82)+'" y1="'+(t.y+64)+'" x2="'+(t.x-58)+'" y2="'+(t.y+40)+'"/></g>'}
  return '<svg viewBox="'+vb+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+baseMapSVG({grid:false,zones:false})+o+"</svg>";
}
function pageGames(v){
  const draw=()=>{const len=LEN(), N=len==="all"?LOCS.length:10;
  const tot=len==="all"?totalOf(store.get("lastName","")):null;
  v.innerHTML='<div class="page"><div class="page-h"><div><h1 class="disp">Spellen</h1><p>Leer waar alles ligt op het veld. Elke vraag is maximaal 1000 punten waard.</p></div>'+lenSeg()+"</div>"+
    '<p class="len-note">'+(len==="all"?"Je beste score bij elk van de drie spellen telt op tot je totaal in de competitiestand."+
      (tot?"<b>Jouw totaal "+nlN(tot.score)+(tot.ref?"":" · plek "+tot.rank)+" · "+tot.played+" van 3 gespeeld</b>":""):"Om te oefenen: elke keer 10 willekeurige locaties. Telt niet mee voor de competitiestand.")+"</p>"+
    '<div class="games">'+GAMES.map((g,i)=>{const mode=g.id+"-"+len, name=store.get("lastName",""), best=name?Scores.best(mode,name):null, board=Scores.board(mode), row=best?board.find(r=>nkey(r.n)===nkey(name)):null;
      return '<article class="game"><div class="game-art">'+gameArt(g.id)+'</div><div class="game-b"><h2 class="disp"><span class="ctl" aria-hidden="true">'+(i+1)+"</span>"+g.title+"</h2><p>"+g.desc+'</p><div class="game-meta"><span class="chip op">'+g.rule+"</span>"+
        (best?'<span class="best">Jouw beste <b>'+nlN(best.score)+"</b>"+(row&&!row.ref?" · plek "+row.rank:"")+"</span>":'<span class="muted">Nog niet gespeeld</span>')+'</div></div><button class="btn pri lg" data-play="'+g.id+'">Speel '+N+"</button></article>"}).join("")+"</div></div>";
  };
  draw();
  v.onclick=e=>{const b=e.target.closest("[data-len]");if(b){store.set("len",b.dataset.len);draw();return}
    const p=e.target.closest("[data-play]");if(p)askName(name=>startGame(p.dataset.play,LEN(),name))};
  // bij nieuwe scores opnieuw tekenen; één vaste luisteraar (eerder kwam er bij elke update een bij, waardoor de pagina vastliep)
  let t=0; const off=Scores.on(()=>{clearTimeout(t);t=setTimeout(()=>{if(route==="spellen"&&!document.querySelector(".play"))draw()},200)}); cleanup=()=>{clearTimeout(t);off();v.onclick=null};
}

/* ---------- ranglijst ---------- */
const DEV={m:["Telefoon",'<rect x="4.5" y="1.5" width="7" height="13" rx="1.6"/><path d="M7.2 12.1h1.6"/>'],
  t:["Tablet",'<rect x="2" y="2.5" width="12" height="11" rx="1.6"/><path d="M7.2 11.3h1.6"/>'],
  c:["Computer",'<rect x="3" y="3" width="10" height="7.2" rx="1"/><path d="M1.5 12.6h13"/>']};
// icoontjes van de toestellen waarop gespeeld is (elk toestel één keer)
const devIcons=list=>list.filter((d,i,a)=>DEV[d]&&a.indexOf(d)===i).map(d=>'<span class="dev" title="'+DEV[d][0]+'" role="img" aria-label="'+DEV[d][0]+'"><svg viewBox="0 0 16 16">'+DEV[d][1]+"</svg></span>").join("");
function rankRow(r,i,me,ic,mark){const you=me>=0&&i===me;
  return '<li class="'+(r.ref?"hc":r.rank<=3?"m"+r.rank:"")+(you?" you":"")+(mark&&r.ts===mark&&r.mine?" now":"")+'"><span class="rk">'+(r.ref?"":r.rank)+'</span><span class="nm"><b>'+esc(r.n)+devIcons([r.dev])+(you?'<i class="tag">jij</i>':"")+"</b><small>"+mmss(r.sec)+" · "+(ic?nlS(r.avg)+" s gem.":Math.round(r.avg)+" m gem.")+'</small></span><span class="sc">'+nlN(r.score)+"</span></li>"}
// de maker (alle namen met "Raymond") staat los onder de ranglijst: één regel met zijn beste score, zonder plek
function hcHTML(rows,me,ic,mark){const r=rows.find(x=>x.ref); // rijen zijn al gesorteerd, dus dit is de beste
  return r?'<div class="hc-box"><span class="hc-h">Score van de maker</span><ol class="rank">'+rankRow(Object.assign({},r,{n:"Raymond"}),-1,me,ic,mark)+"</ol></div>":""}
function boardHTML(mode,g,max,mark){
  const rows=Scores.board(mode), name=store.get("lastName",""), me=rows.findIndex(r=>r.mine&&nkey(r.n)===nkey(name)), ic=g.time;
  if(!rows.length)return '<div class="empty">Nog geen scores. Speel als eerste en zet de lat.</div>';
  const ranked=rows.map((r,i)=>[r,i]).filter(([r])=>!r.ref);
  let h=ranked.length?'<ol class="rank">'+ranked.slice(0,max).map(([r,i])=>rankRow(r,i,me,ic,mark)).join("")+"</ol>":'<div class="empty">Nog geen scores van deelnemers.</div>';
  const mine=ranked.slice(max).find(([r,i])=>i===me);
  if(mine)h+='<ol class="rank rank-me">'+rankRow(mine[0],mine[1],me,ic,mark)+"</ol>";
  if(ranked.length>max)h+='<button class="btn all" data-all="'+mode+'">Hele lijst ('+ranked.length+")</button>";
  return h+hcHTML(rows,me,ic,mark);
}
function pageRank(v){
  const draw=()=>{const len=LEN();
    v.innerHTML='<div class="page"><div class="page-h"><div><h1 class="disp">Ranglijst</h1><p>Per speler telt de beste score. Bij een gelijke score wint de snelste.</p></div>'+lenSeg()+"</div>"+
      (len==="all"?'<section class="board board-tot"><div class="board-h"><h2 class="disp">Competitiestand</h2><small>'+plural(totalBoard().filter(r=>!r.ref).length,"speler","spelers")+'</small></div><p class="board-sub">Je beste scores bij de drie spellen opgeteld, met alle '+LOCS.length+" locaties. Een spel dat je nog niet speelde telt als 0.</p>"+totalHTML(10)+"</section>":"")+
      '<div class="boards">'+GAMES.map((g,i)=>'<section class="board"><div class="board-h"><span class="ctl" aria-hidden="true">'+(i+1)+'</span><h2 class="disp">'+g.title+"</h2><small>"+plural(Scores.board(g.id+"-"+len).filter(r=>!r.ref).length,"speler","spelers")+"</small></div>"+boardHTML(g.id+"-"+len,g,10)+"</section>").join("")+"</div>"+
      '<div class="foot"><span>'+(Scores.online?"Live: scores van alle spelers worden gedeeld.":"Offline: je ziet de laatst bekende ranglijst. Nieuwe scores gaan mee zodra er weer verbinding is.")+'</span><button class="linkbtn" id="wipe">Scores van dit toestel uit de ranglijst halen</button></div></div>'};
  draw();
  v.onclick=e=>{const b=e.target.closest("[data-len]");if(b){store.set("len",b.dataset.len);draw();return}
    const a=e.target.closest("[data-all]");if(a&&a.dataset.all==="total"){showAllTotal();return}
    if(a){const g=GAMES.find(x=>a.dataset.all.startsWith(x.id+"-"));showAll(a.dataset.all,g);return}
    if(e.target.id==="wipe"){
      // alleen met verbinding: anders verdwijnen ze hier wel, maar blijven ze online staan
      if(!Scores.online){toast("Geen verbinding. Probeer het opnieuw zodra je online bent.");return}
      confirmDlg("Uit de ranglijst halen?","Alle scores die op dit toestel gespeeld zijn verdwijnen uit de ranglijst, voor iedereen. Scores van andere toestellen blijven staan.","Uit de ranglijst halen",()=>{Scores.clearMine();toast("Je scores zijn uit de ranglijst gehaald");draw()},"danger")}};
  let t=0; const off=Scores.on(()=>{clearTimeout(t);t=setTimeout(()=>{if(route==="ranglijst"&&!$(".dlg-bg"))draw()},200)}); cleanup=()=>{off();v.onclick=null};
}

/* ---------- beheer (#beheer) ---------- */
function pageAdmin(v){
  const when=t=>new Date(t).toLocaleString("nl-NL",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"});
  let busy=false;
  const draw=()=>{const code=store.get("admin",""), on=Scores.online, last=Scores.lastReset;
    v.innerHTML='<div class="page adm"><div class="page-h"><div><h1 class="disp">Beheer</h1><p>Alleen voor de beheerder van de app.</p></div></div>'+
      (!code?'<section class="board adm-box"><h2 class="disp">Beheercode</h2><p>Vul de beheercode in om de ranglijst te kunnen beheren. De code wordt op dit toestel onthouden.</p>'+
        '<form class="form" id="af"><input class="inp" id="acode" type="password" autocomplete="current-password" spellcheck="false" placeholder="Beheercode" aria-label="Beheercode"><div class="err" id="aerr" hidden>Deze beheercode klopt niet.</div><button class="btn pri lg" type="submit">Doorgaan</button></form></section>'
      :'<section class="board adm-box"><h2 class="disp">Alle scores wissen</h2><p>De ranglijsten van alle spellen worden leeg, bij iedereen. Ook de beste scores op elk toestel verdwijnen. Toestellen die nu geen verbinding hebben, wissen hun scores zodra ze weer online zijn.</p>'+
        '<dl class="adm-st"><div><dt>Verbinding</dt><dd>'+(on?'<span class="dot on"></span>Online':'<span class="dot"></span>Geen verbinding')+'</dd></div><div><dt>Laatst gewist</dt><dd>'+(last?when(last):"Nog nooit")+"</dd></div></dl>"+
        '<button class="btn danger lg" id="areset"'+(on&&!busy?"":" disabled")+">"+(busy?"Bezig met wissen…":"Alle scores wissen")+"</button>"+
        (on?"":'<p class="hint">Wissen kan pas als er verbinding is met de ranglijst.</p>')+
        '<div class="foot"><span></span><button class="linkbtn" id="aforget">Beheercode vergeten op dit toestel</button></div></section>')+"</div>";
    const f=$("#af"); if(f){$("#acode").focus();f.onsubmit=async e=>{e.preventDefault();const c=$("#acode").value.trim();if(!c)return;
      if(await Scores.checkCode(c)){store.set("admin",c);draw()}else{$("#aerr").hidden=false;$("#acode").select()}}}
  };
  draw();
  v.onclick=e=>{
    if(e.target.id==="aforget"){try{localStorage.removeItem("baveld.admin")}catch(x){}draw();return}
    if(e.target.id==="areset")confirmDlg("Alle scores wissen?","De ranglijst wordt voor iedereen leeg. Dit kun je niet ongedaan maken.","Alles wissen",async()=>{
      busy=true;draw(); const r=await Scores.resetAll(store.get("admin","")); busy=false;
      if(r==="code"){try{localStorage.removeItem("baveld.admin")}catch(x){}toast("De beheercode klopt niet meer. Vul hem opnieuw in.")}
      else toast(r==="ok"?"Alle scores zijn gewist":"Geen verbinding. Probeer het opnieuw zodra je online bent.");
      draw()},"danger");
  };
  const off=Scores.on(()=>{if(route==="beheer"&&!$(".dlg-bg")&&!$("#af"))draw()}); cleanup=()=>{off();v.onclick=null};
}

/* ---------- vensters ---------- */
function dialog(html,onOpen){
  const bg=document.createElement("div"); bg.className="dlg-bg"; bg.innerHTML='<div class="dlg" role="dialog" aria-modal="true"><button class="x" aria-label="Sluiten">×</button>'+html+"</div>";
  document.body.appendChild(bg); const prev=document.activeElement;
  const close=()=>{bg.remove();document.removeEventListener("keydown",key);if(prev&&prev.focus)prev.focus({preventScroll:true})}, key=e=>{if(e.key==="Escape")close()};
  document.addEventListener("keydown",key); bg.addEventListener("click",e=>{if(e.target===bg||e.target.closest(".x"))close()});
  onOpen&&onOpen(bg.querySelector(".dlg"),close); return close;
}
function confirmDlg(t,p,ok,fn,kind){dialog('<h2 class="disp">'+t+"</h2><p>"+p+'</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn" data-c>Annuleren</button><button class="btn '+(kind||"pri")+'" data-ok>'+ok+"</button></div>",(d,close)=>{d.querySelector("[data-c]").onclick=close;d.querySelector("[data-ok]").onclick=()=>{close();fn()};d.querySelector("[data-ok]").focus()})}
function showAll(mode,g){
  const rows=Scores.board(mode), name=store.get("lastName",""), me=rows.findIndex(r=>r.mine&&nkey(r.n)===nkey(name));
  dialog('<h2 class="disp">'+g.title+"</h2><p>"+(mode.endsWith("all")?"Alle "+LOCS.length+" locaties":"10 locaties")+" · "+plural(rows.filter(r=>!r.ref).length,"speler","spelers")+'</p><ol class="rank">'+rows.map((r,i)=>[r,i]).filter(([r])=>!r.ref).map(([r,i])=>rankRow(r,i,me,g.time)).join("")+"</ol>"+hcHTML(rows,me,g.time),d=>{const y=d.querySelector(".you");if(y&&me>6)y.scrollIntoView({block:"center"})});
}
function showAllTotal(){
  dialog('<h2 class="disp">Competitiestand</h2><p>Alle '+LOCS.length+" locaties · "+plural(totalBoard().filter(r=>!r.ref).length,"speler","spelers")+"</p>"+totalHTML(1e9),d=>{const y=d.querySelector(".you");if(y)y.scrollIntoView({block:"center"})});
}
function askName(done){ // eerst kiezen wie er speelt
  const names=Scores.myNames().concat(store.get("names",[])).filter((n,i,a)=>a.findIndex(x=>nkey(x)===nkey(n))===i).slice(0,8);
  const last=store.get("lastName",""); names.sort((a,b)=>(nkey(b)===nkey(last))-(nkey(a)===nkey(last)));
  const form='<form class="form" id="nf"><input class="inp" id="nin" maxlength="16" autocomplete="nickname" placeholder="Je naam" aria-label="Je naam"><div class="err" id="nerr" hidden>Vul een naam in.</div><button class="btn pri lg" type="submit">Spelen</button></form>';
  dialog('<h2 class="disp">Wie speelt er?</h2><p>'+(names.length?"Kies je naam, dan komt je score op de goede plek.":"Vul je naam in, dan komt je score op de ranglijst.")+"</p>"+
    (names.length?'<div class="who-list">'+names.map(n=>'<button class="who" data-who="'+esc(n)+'"><span class="av">'+esc(n.charAt(0).toUpperCase())+"</span>"+esc(n)+(nkey(n)===nkey(last)?"<small>laatst</small>":"")+"</button>").join("")+'<button class="who new" id="nnew">+ Nieuwe naam</button></div><div id="nmore" hidden>'+form+"</div>":form),
  (d,close)=>{
    const use=n=>{n=String(n).trim().slice(0,16);const hit=names.find(x=>nkey(x)===nkey(n));if(hit)n=hit;store.set("lastName",n);store.set("names",[n].concat(store.get("names",[]).filter(x=>nkey(x)!==nkey(n))).slice(0,8));close();done(n)};
    d.addEventListener("click",e=>{const w=e.target.closest("[data-who]");if(w)use(w.dataset.who);if(e.target.id==="nnew"){e.target.hidden=true;$("#nmore",d).hidden=false;$("#nin",d).focus()}});
    d.addEventListener("submit",e=>{e.preventDefault();const v=$("#nin",d).value.trim();if(!v){$("#nerr",d).hidden=false;$("#nin",d).focus();return}use(v)});
    const f=d.querySelector(".who")||$("#nin",d); if(f)f.focus();
  });
}

/* ---------- spellen ---------- */
const GAMES=[
  {id:"tik",title:"Aanwijzen",desc:"Je krijgt een naam. Tik op de kaart om in te zoomen en tik dan zo snel mogelijk het juiste rondje aan.",rule:"Goed binnen 4 s: 1000 punten",time:true,limit:4},
  {id:"naam",title:"Benoemen",desc:"Eén rondje licht op. Typ de naam en kies hem uit de suggesties.",rule:"Goed binnen 6 s: 1000 punten",time:true,limit:6},
  {id:"plek",title:"Plaatsen",desc:"Een kaart zonder rondjes. Tik waar de locatie ligt: hoe dichterbij, hoe meer punten.",rule:"Binnen 7 m: 1000 punten",time:false}
];
const SMALL_S=.55;   // Plaatsen: kaart kleiner dan dit (px per eenheid) zoomt eerst in rond je tik
const ZF=3.2;        // hoeveel keer inzoomen
const timePts=(s,lim)=>s<=lim?1000:Math.max(100,Math.round(1000*Math.exp(-(s-lim)/8)));
const distPts=d=>d<=7?1000:Math.round(1000*Math.exp(-(d-7)/60));
const qCol=p=>{const k=Math.max(0,Math.min(1,(p-150)/850)),h=Math.round(Math.pow(k,1.6)*135);return "hsl("+h+",70%,"+(36+Math.round(Math.sin(k*Math.PI)*3))+"%)"};
const GAME_BOX=[FIELD_BOX[0]-10,FIELD_BOX[1]-10,FIELD_BOX[2]+10,FIELD_BOX[3]+10];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function deal(gid,n){ // trekstapel per spel: je ziet alle locaties voordat er een terugkomt
  const decks=store.get("decks",{}); let d=(decks[gid]||[]).filter(x=>LOCS.some(l=>l.n===x));
  const out=[]; while(out.length<n){if(!d.length)d=shuffle(LOCS.map(l=>l.n)).filter(x=>!out.includes(x));const x=d.shift();if(!out.includes(x))out.push(x)}
  decks[gid]=d; store.set("decks",decks); return out.map(x=>LOCS.find(l=>l.n===x));
}

let Q=null;
// toestel waarop gespeeld is: m = telefoon, t = tablet, c = computer. Kijkt naar de tikken en klikken zelf (vinger of muis),
// en alleen als er niet getikt of geklikt is (bijvoorbeeld alleen getypt) naar wat voor scherm het is
function deviceOf(ptr){
  const touch=(ptr.touch||0)+(ptr.pen||0), mouse=ptr.mouse||0;
  const finger=touch||mouse?touch>mouse:matchMedia("(pointer:coarse)").matches&&!matchMedia("(any-pointer:fine)").matches;
  return !finger?"c":Math.min(screen.width,screen.height)<600?"m":"t";
}
function startGame(gid,len,name){
  const g=GAMES.find(x=>x.id===gid), list=len==="all"?shuffle(LOCS):deal(gid,10);
  Q={g,len,mode:gid+"-"+len,name,list,i:0,phase:"ready",res:[],used:0,zoom:null,typed:"",ptr:{}};
  const el=document.createElement("div"); el.className="play"; el.setAttribute("role","dialog"); el.setAttribute("aria-label",g.title);
  el.innerHTML='<header class="hud"></header><div class="stage"><div class="mapbox"><div class="gmap"></div></div><button class="icon-btn unzoom" id="unz" aria-label="Uitzoomen" hidden>'+IC.minus+'</button><div class="zoomed-hint" hidden>Ingezoomd · tik opnieuw</div><div class="ready" hidden></div></div><footer class="dock"></footer>';
  document.body.appendChild(el); Q.el=el; document.body.style.overflow="hidden";
  Q.mv=new MapView($(".gmap",el),{interactive:false,tight:true,bounds:GAME_BOX,pad:8,maxS:8,onTap:onMapTap,onReady:()=>viewFor(0),refit:()=>viewFor(0)});
  Q.mv.setBase(baseMapSVG({grid:true,zones:false,spawns:true}));
  el.addEventListener("click",onPlayClick);
  el.addEventListener("pointerdown",e=>{if(Q&&Q.phase!=="done")Q.ptr[e.pointerType]=(Q.ptr[e.pointerType]||0)+1},true); // waarmee echt gespeeld wordt
  el.addEventListener("input",e=>{if(e.target.id==="typ"){Q.typed=e.target.value;Q.hi=0;drawSugg()}});
  el.addEventListener("keydown",onPlayKey);
  vvBind(true); render();
}
function stopGame(){if(!Q)return;Q.mv.destroy();Q.el.remove();Q=null;document.body.style.overflow="";vvBind(false);if(route==="spellen"||route==="ranglijst")go()} // via go(): ruimt de oude pagina netjes op
// telefoon: de hoogte van het spel volgt het zichtbare deel, zodat typveld en kaart boven het toetsenbord blijven
function vvSet(){if(Q)Q.el.style.setProperty("--vvh",(window.visualViewport?visualViewport.height:innerHeight)+"px");if(window.visualViewport&&visualViewport.offsetTop)window.scrollTo(0,0)}
function vvBind(on){const f=on?"addEventListener":"removeEventListener";(window.visualViewport||window)[f]("resize",vvSet);if(on)vvSet()}

function viewFor(ms){ // welk stuk kaart in beeld is
  if(!Q)return; const mv=Q.mv, cur=Q.list[Q.i];
  if(Q.zoom&&Q.phase==="ask")return mv.to(Q.zoom,ms);
  const r=Q.phase==="result"&&Q.res[Q.i], small=mv.fitS(GAME_BOX,8)<SMALL_S;
  // kleine kaart: bij de uitslag (en bij Benoemen ook tijdens de vraag) inzoomen op de betrokken punten, zodat namen leesbaar zijn
  if(small&&(r||(Q.g.id==="naam"&&Q.phase==="ask"))){
    const pts=[cur]; if(r&&r.pick&&r.pick!==cur.n)pts.push(LOCS.find(l=>l.n===r.pick)); if(r&&!Q.g.time)pts.push({x:r.gx,y:r.gy});
    const x0=Math.min(...pts.map(p=>p.x))-170,x1=Math.max(...pts.map(p=>p.x))+170,y0=Math.min(...pts.map(p=>p.y))-150,y1=Math.max(...pts.map(p=>p.y))+150;
    return mv.fit([x0,y0,x1,y1],ms,6);
  }
  return mv.fit(GAME_BOX,ms,8);
}

function render(){
  const g=Q.g, cur=Q.list[Q.i], ph=Q.phase, r=ph==="result"?Q.res[Q.i]:null, n=Q.list.length;
  const total=Q.res.reduce((a,x)=>a+x.pts,0);
  // bovenbalk
  const dots=n<=12?'<div class="dots">'+Q.list.map((_,i)=>{const x=Q.res[i];return '<i class="'+(x?(g.time?(x.ok?"ok":"bad"):""):i===Q.i?"cur":"")+'"'+(x&&!g.time?' style="background:'+qCol(x.pts)+'"':"")+"></i>"}).join("")+"</div>":'<div class="dots bar"><b style="width:'+Math.round(Q.res.length/n*100)+'%"></b></div>';
  const ask=g.id==="tik"?"Tik het rondje van":g.id==="plek"?"Waar ligt":"Welk punt licht op?";
  const big=ph==="ready"?"· · ·":g.id==="naam"?(r?cur.n:"Typ de naam"):cur.n+(g.id==="plek"?"?":"");
  $(".hud",Q.el).innerHTML='<div class="prog">'+dots+"<span>Vraag "+(Q.i+1)+" van "+n+" · "+(Q.len==="all"?"Competitie":"Vrij spel")+'</span></div><div class="q" aria-live="polite"><small>'+(g.id==="naam"&&isPhone()?"":ask)+'</small><strong class="disp'+(ph==="ready"||(g.id==="naam"&&!r)?" dim":"")+'">'+esc(big)+'</strong></div><div class="score"><small>Score</small><b class="disp num">'+nlN(total)+'</b></div><button class="quit" id="quit" aria-label="Stoppen" title="Stoppen">×</button>';
  // kaartlaag
  Q.mv.setGame(gameLayer());
  $("#unz").hidden=!(Q.zoom&&ph==="ask"); $(".zoomed-hint",Q.el).hidden=!(Q.zoom&&ph==="ask");
  const rd=$(".ready",Q.el); rd.hidden=ph!=="ready";
  if(ph==="ready")rd.innerHTML='<div><h2 class="disp">'+(Q.i===0?"Klaar?":"Vraag "+(Q.i+1))+"</h2><p>"+(g.time?"De tijd loopt vanaf Start. "+(g.id==="tik"?"Je eerste tik zoomt in, met je tweede tik geef je antwoord. ":"")+g.rule.replace(": "," is ")+".":"Tik op de kaart waar de locatie ligt. Binnen 7 meter is 1000 punten.")+'</p><button class="btn pri lg" id="go">Start</button></div>';
  // onderbalk
  const dock=$(".dock",Q.el); dock.classList.toggle("typing",g.id==="naam");
  if(r){const ok=g.time?r.ok:r.d<=7;
    const msg=g.time?(r.ok?"Goed · "+nlS(r.s)+" s":"Fout"):(ok?"Raak!":r.d+" meter ernaast"), sub=g.time&&!r.ok?(r.skip?"Overgeslagen":(g.id==="naam"?"Je typte ":"Je koos ")+esc(r.pick||"niets")):esc(cur.n);
    dock.innerHTML='<div class="fb '+(g.time?(ok?"ok":"bad"):"")+'" role="status"'+(g.time?"":' style="background:'+qCol(r.pts)+'"')+'><span class="i" aria-hidden="true">'+(ok?"✓":g.time?"✗":"◎")+'</span><div class="t"><b class="disp">'+msg+"</b><span>"+sub+'</span></div><span class="pts disp num">+'+nlN(r.pts)+'</span><button class="btn" id="next">'+(Q.i+1<n?"Volgende":"Uitslag")+"</button></div>";
  }else if(g.id==="naam"){
    dock.innerHTML='<div class="typer"><div class="typ-row"><input class="inp" id="typ" type="text" inputmode="search" enterkeyhint="go" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="'+(ph==="ready"?"Druk eerst op Start":"Typ de naam, bijv. kerk")+'" aria-label="Naam van de locatie"'+(ph==="ready"?" disabled":"")+'><button class="btn skip" id="skip" type="button"'+(ph==="ready"?" disabled":"")+'>Overslaan</button></div><div class="sugg" id="sugg" role="listbox"></div></div>';
    drawSugg();
  }else dock.innerHTML='<div class="dock-hint">'+(ph==="ready"?"De kaart staat klaar.":Q.zoom?"Ingezoomd: tik het juiste "+(g.id==="tik"?"rondje":"punt")+" aan.":g.id==="tik"?"Tik waar het rondje ligt om in te zoomen.":"Tik op de kaart waar het ligt.")+"</div>";
  // focus
  const ti=$("#typ",Q.el), nx=$("#next",Q.el)||$("#go",Q.el);
  if(ti&&ph==="ask")ti.focus({preventScroll:true}); else if(nx&&matchMedia("(hover:hover)").matches)nx.focus({preventScroll:true});
}
function drawSugg(){
  const box=$("#sugg",Q.el); if(!box)return; const list=searchLocs(Q.typed,6); Q.hi=Math.min(Q.hi||0,Math.max(0,list.length-1));
  box.innerHTML=Q.phase!=="ask"?"":!Q.typed.trim()?'<span class="wait">Suggesties verschijnen hier</span>':list.length?list.map((l,i)=>'<button class="'+(i===Q.hi?"on":"")+'" data-ans="'+esc(l.n)+'" role="option">'+esc(l.n)+"</button>").join(""):'<span class="none">Geen locatie gevonden</span>';
}
function gameLayer(){ // rondjes en uitslag, in kaarteenheden
  const g=Q.g, cur=Q.list[Q.i], ph=Q.phase, r=ph==="result"?Q.res[Q.i]:null, k=1/Math.max(.3,Q.mv.ts||Q.mv.s), fs=Math.max(13,14*k);
  const ring=(l,c,w,fill)=>'<circle cx="'+l.x+'" cy="'+l.y+'" r="15.5" fill="'+(fill||"#fff")+'" fill-opacity="'+(fill?1:.55)+'" stroke="'+c+'" stroke-width="'+w+'"/>';
  const tag=(l,t,c)=>'<text x="'+l.x+'" y="'+(l.y-22-4*k)+'" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="800" font-size="'+fs.toFixed(1)+'" fill="'+c+'" stroke="#fff" stroke-width="'+(4*k).toFixed(1)+'" paint-order="stroke" stroke-linejoin="round">'+esc(t)+"</text>";
  let s="";
  if(g.id==="tik")s+=LOCS.map(l=>ring(l,"#B4237A",3.4)).join("");
  if(g.id==="naam"){s+=LOCS.map(l=>ring(l,"#1A1C19",2.2)).join("");
    if(ph==="ask")s+='<circle cx="'+cur.x+'" cy="'+cur.y+'" r="26" fill="#B4237A" fill-opacity=".18"><animate attributeName="r" values="22;38;22" dur="1.5s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values=".28;.04;.28" dur="1.5s" repeatCount="indefinite"/></circle>'+ring(cur,"#B4237A",5,"#fff")+'<text x="'+cur.x+'" y="'+(cur.y+7)+'" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="800" font-size="20" fill="#B4237A">?</text>'}
  if(r){
    if(g.time){const p=r.pick&&LOCS.find(l=>l.n===r.pick);
      if(!r.ok&&p)s+=ring(p,"#CF2A3A",5,"#FBE5E7")+'<g stroke="#CF2A3A" stroke-width="3.5" stroke-linecap="round"><line x1="'+(p.x-7)+'" y1="'+(p.y-7)+'" x2="'+(p.x+7)+'" y2="'+(p.y+7)+'"/><line x1="'+(p.x-7)+'" y1="'+(p.y+7)+'" x2="'+(p.x+7)+'" y2="'+(p.y-7)+'"/></g>'+tag(p,p.n,"#CF2A3A");
      s+=ring(cur,"#2E7D4F",5,"#E2F1E7")+iconAt(cur)+tag(cur,cur.n,"#1F5F3A")}
    else s+='<line x1="'+r.gx+'" y1="'+r.gy+'" x2="'+cur.x+'" y2="'+cur.y+'" stroke="#1A1C19" stroke-width="'+(2.5*k).toFixed(1)+'" stroke-dasharray="'+(7*k).toFixed(1)+" "+(5*k).toFixed(1)+'"/>'+ring(cur,"#2E7D4F",5,"#E2F1E7")+iconAt(cur)+tag(cur,cur.n,"#1F5F3A")+crossAt(r.gx,r.gy,"#B4237A",k);
  }
  return s;
}
const iconAt=l=>'<g transform="translate('+l.x+" "+l.y+') scale(.82)"><g fill="none" stroke="#1A1C19" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[l.n]||"")+"</g></g>";
const crossAt=(x,y,c,k)=>{const a=9*Math.max(1,k*.8);return '<g stroke="#fff" stroke-width="8" stroke-linecap="round"><line x1="'+(x-a)+'" y1="'+(y-a)+'" x2="'+(x+a)+'" y2="'+(y+a)+'"/><line x1="'+(x-a)+'" y1="'+(y+a)+'" x2="'+(x+a)+'" y2="'+(y-a)+'"/></g><g stroke="'+c+'" stroke-width="4.5" stroke-linecap="round"><line x1="'+(x-a)+'" y1="'+(y-a)+'" x2="'+(x+a)+'" y2="'+(y+a)+'"/><line x1="'+(x-a)+'" y1="'+(y+a)+'" x2="'+(x+a)+'" y2="'+(y-a)+'"/></g>'};

function begin(){Q.phase="ask";Q.zoom=null;Q.typed="";Q.hi=0;Q.qs=performance.now();viewFor(0);render()}
function answer(res){
  const ms=performance.now()-Q.qs; Q.used+=ms; res.s=Math.round(ms/10)/100; res.n=Q.list[Q.i].n;
  if(Q.g.time)res.pts=res.ok?timePts(res.s,Q.g.limit):0;
  Q.res[Q.i]=res; Q.phase="result"; Q.zoom=null; viewFor(260); render();
}
function onMapTap(p,t){
  if(!Q||Q.phase!=="ask"||Q.g.id==="naam")return; const mv=Q.mv;
  if(Q.g.id==="tik"){
    if(!Q.zoom){zoomIn(p);return} // eerste tik zoomt altijd in, op elk scherm: zo weet je altijd wat een tik doet
    const hit=Math.max(26,22/mv.s); let best=null; LOCS.forEach(l=>{const d=Math.hypot(l.x-p.x,l.y-p.y);if(d<=hit&&(!best||d<best.d))best={d,l}}); if(!best)return;
    answer({ok:best.l.n===Q.list[Q.i].n,pick:best.l.n,gx:best.l.x,gy:best.l.y});return}
  if(!Q.zoom&&mv.s<SMALL_S){zoomIn(p);return}
  const d=Math.round(GEO.meters(p,Q.list[Q.i])); answer({gx:Math.round(p.x),gy:Math.round(p.y),d,pts:distPts(d)});
}
function zoomIn(p){Q.zoom={s:Q.mv.s*ZF,cx:p.x,cy:p.y};Q.mv.to(Q.zoom,230);render()}
function onPlayClick(e){
  const b=e.target.closest("button"); if(!b||!Q)return;
  if(b.id==="quit")return stopGame();
  if(b.id==="go")return begin();
  if(b.id==="unz"){Q.zoom=null;viewFor(230);render();return}
  if(b.id==="skip"&&Q.phase==="ask"){answer({ok:false,pick:null,skip:true});return} // telt als fout
  if(b.dataset.ans&&Q.phase==="ask"){const cur=Q.list[Q.i];answer({ok:b.dataset.ans===cur.n,pick:b.dataset.ans});return}
  if(b.id==="next"){if(Q.i+1<Q.list.length){Q.i++;Q.phase="ready";Q.typed="";viewFor(0);begin()}else finish();return}
  if(b.dataset.q==="again"){const {g,len,name}=Q;stopGame();startGame(g.id,len,name);return}
  if(b.dataset.q==="other"){stopGame();location.hash="#spellen";return}
}
function onPlayKey(e){
  if(!Q)return;
  if(e.target.id==="typ"&&Q.phase==="ask"){const list=searchLocs(Q.typed,6);
    if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="ArrowLeft"||e.key==="ArrowUp"){if(e.key.startsWith("ArrowL")||e.key.startsWith("ArrowR")){if(!list.length)return}e.preventDefault();Q.hi=((Q.hi||0)+(e.key==="ArrowDown"||e.key==="ArrowRight"?1:-1)+list.length)%Math.max(1,list.length);drawSugg()}
    else if(e.key==="Enter"){e.preventDefault();if(list.length)answer({ok:list[Q.hi||0].n===Q.list[Q.i].n,pick:list[Q.hi||0].n})}}
}

/* ---------- uitslag ---------- */
function finish(){
  const g=Q.g, total=Q.res.reduce((a,x)=>a+x.pts,0), max=Q.list.length*1000, ts=Date.now();
  const avg=g.time?Q.res.reduce((a,x)=>a+x.s,0)/Q.res.length:Q.res.reduce((a,x)=>a+x.d,0)/Q.res.length;
  const prevBest=Scores.best(Q.mode,Q.name);
  const run={n:Q.name,mode:Q.mode,score:total,avg:Math.round(avg*100)/100,sec:Math.round(Q.used/10)/100,ts,max,dev:deviceOf(Q.ptr)};
  Scores.add(run); Q.phase="done"; Q.mv.destroy();
  const board=Scores.board(Q.mode), row=board.find(r=>r.mine&&nkey(r.n)===nkey(Q.name)), best=Scores.best(Q.mode,Q.name), isBest=best&&best.ts===ts;
  const pct=total/max, stars=pct>=.9?3:pct>=.7?2:pct>=.4?1:0;
  const kpi=g.time?[["Goed",Q.res.filter(x=>x.ok).length+" van "+Q.res.length],["Gemiddeld",nlS(avg)+" s"],["Tijd",mmss(run.sec)]]:[["Raak",Q.res.filter(x=>x.d<=7).length+" van "+Q.res.length],["Gemiddeld ernaast",Math.round(avg)+" m"],["Tijd",mmss(run.sec)]];
  const hist=Scores.history(Q.mode,Q.name).slice(-5), hmax=Math.max(1,...hist.map(h=>h.score));
  Q.el.className="play done";
  Q.el.innerHTML='<div class="res-wrap"><div class="res-top"><button class="btn ghost" data-q="other">← Spellen</button><span class="muted">'+esc(Q.name)+"</span></div>"+
    '<section class="result">'+TOPO+'<div class="stars" aria-label="'+stars+' van 3 sterren">'+[1,2,3].map(i=>'<svg viewBox="0 0 24 24" class="'+(i<=stars?"on":"")+'" style="--d:'+(250+i*130)+'ms"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/></svg>').join("")+"</div>"+
    '<div class="big disp num" data-to="'+total+'">0</div><div class="of">van '+nlN(max)+" punten · "+g.title+" · "+(Q.len==="all"?"alle "+LOCS.length:"10")+" locaties</div>"+
    (isBest&&prevBest?'<div class="badge">Nieuwe persoonlijke beste</div>':"")+'<div class="place">'+(Q.len==="all"?(t=>t?(t.ref?"Maker van de app · je totaal is nu "+nlN(t.score):"Je totaal is nu "+nlN(t.score)+", plek "+t.rank+" in de competitie"):"")(totalOf(Q.name))
      :"Vrij spel"+(row&&!row.ref?" · plek "+row.rank+" van "+board.filter(r=>!r.ref).length:""))+(!isBest&&best?" · jouw beste blijft "+nlN(best.score):"")+"</div>"+
    '<dl class="kpi">'+kpi.map(x=>"<div><dt>"+x[0]+'</dt><dd class="disp num">'+x[1]+"</dd></div>").join("")+'</dl><div class="acts"><button class="btn pri lg" data-q="again">Nog een keer</button><button class="btn lg" data-q="other">Ander spel</button></div></section>'+
    '<div class="grid3"><section class="card"><h3 class="disp">Per locatie</h3><ol class="per">'+Q.res.map(x=>{const ok=g.time?x.ok:x.d<=7;
      return '<li class="'+(g.time?(ok?"ok":"bad"):"")+'"><span class="i"'+(g.time?"":' style="background:'+qCol(x.pts)+'"')+">"+(ok?"✓":g.time?"✗":"")+'</span><span class="n">'+esc(x.n)+(g.time&&!ok?(x.skip?"<small>overgeslagen</small>":x.pick?"<small>jij: "+esc(x.pick)+"</small>":""):"")+'</span><span class="d">'+(g.time?(ok?nlS(x.s)+" s":"fout"):x.d+" m")+'</span><span class="p">'+(x.pts?"+"+nlN(x.pts):"0")+"</span></li>"}).join("")+"</ol></section>"+
    '<section class="card"><h3 class="disp">Op de kaart</h3><div class="review">'+reviewSVG()+'</div><p class="legend">'+(g.time?"Groen is de goede plek, rood wat je fout koos.":"Groen is de echte plek, het kruis is waar jij tikte.")+"</p></section>"+
    '<section class="card">'+(hist.length>1?'<h3 class="disp">Jouw laatste potjes</h3><div class="bars">'+hist.map((h,i)=>'<div class="'+(i===hist.length-1?"last ":"")+(best&&h.ts===best.ts?"top":"")+'"><span>'+nlN(h.score)+'</span><i style="height:'+Math.max(5,Math.round(h.score/hmax*100))+'%"></i></div>').join("")+'</div><p class="legend" style="margin:0 0 18px">Gemiddeld '+nlN(Math.round(hist.reduce((a,h)=>a+h.score,0)/hist.length))+" over je laatste "+hist.length+"</p>":"")+
      '<h3 class="disp">Ranglijst</h3>'+boardHTML(Q.mode,g,5,ts)+"</section></div></div>";
  Q.el.scrollTop=0;
  const bigEl=$(".big",Q.el); if(reduced())bigEl.textContent=nlN(total); else{const t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/1000),e=1-Math.pow(1-k,3);bigEl.textContent=nlN(Math.round(total*e));if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
  Q.el.addEventListener("click",e=>{const a=e.target.closest("[data-all]");if(a)showAll(a.dataset.all,g)});
}
function reviewSVG(){
  const g=Q.g, b=GAME_BOX; let s='<svg viewBox="'+b[0]+" "+b[1]+" "+(b[2]-b[0])+" "+(b[3]-b[1])+'" aria-hidden="true">'+baseMapSVG({grid:true,zones:false,spawns:true});
  Q.res.forEach((r,i)=>{const l=Q.list[i];
    if(g.time){const p=r.pick&&LOCS.find(x=>x.n===r.pick);if(!r.ok&&p)s+='<line x1="'+p.x+'" y1="'+p.y+'" x2="'+l.x+'" y2="'+l.y+'" stroke="#CF2A3A" stroke-width="2.5" stroke-dasharray="6 5"/><circle cx="'+p.x+'" cy="'+p.y+'" r="14" fill="#FBE5E7" stroke="#CF2A3A" stroke-width="4"/>';
      s+='<circle cx="'+l.x+'" cy="'+l.y+'" r="14" fill="'+(r.ok?"#E2F1E7":"#fff")+'" stroke="'+(r.ok?"#2E7D4F":"#CF2A3A")+'" stroke-width="4"/>'+iconAt(l)}
    else s+='<line x1="'+r.gx+'" y1="'+r.gy+'" x2="'+l.x+'" y2="'+l.y+'" stroke="#1A1C19" stroke-width="2.5" stroke-dasharray="6 5"/><circle cx="'+l.x+'" cy="'+l.y+'" r="14" fill="#E2F1E7" stroke="'+qCol(r.pts)+'" stroke-width="4"/>'+iconAt(l)+crossAt(r.gx,r.gy,"#B4237A",1);
  });
  return s+"</svg>";
}
const TOPO='<svg class="topo" viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3">'+[0,1,2,3,4,5,6,7,8].map(i=>'<path d="M-20,'+(210-i*20)+" C90,"+(170-i*22)+" 170,"+(230-i*20)+" 280,"+(180-i*19)+" S450,"+(110-i*12)+" 530,"+(160-i*17)+" 640,"+(100-i*11)+'"/>').join("")+'<ellipse cx="470" cy="62" rx="64" ry="27"/><ellipse cx="470" cy="62" rx="38" ry="15"/><ellipse cx="470" cy="62" rx="13" ry="5"/></svg>';

/* ---------- opstarten ---------- */
shell(); go();
addEventListener("hashchange",()=>{if(Q)stopGame();go()});
Scores.on(liveBadge); liveBadge();
// alleen verbonden als de app in beeld is: een tabblad op de achtergrond of een vergrendelde telefoon gaat na 20 s slapen
let nap=0;
document.addEventListener("visibilitychange",()=>{clearTimeout(nap);if(document.hidden)nap=setTimeout(Scores.disconnect,20000);else Scores.connect()});
if(!document.hidden)Scores.connect();
if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("sw.js").catch(()=>{});
window.BAVELD={get Q(){return Q},LOCS,GEO,Scores}; // voor tests

})();
