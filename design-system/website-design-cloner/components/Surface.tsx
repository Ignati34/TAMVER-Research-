import React from "react";
export function Surface({children,light=false}:{children:React.ReactNode;light?:boolean}){return <div style={{background:light?"var(--tamver-color-surface-light)":"var(--tamver-color-surface-dark)",color:light?"var(--tamver-color-foreground-light)":"var(--tamver-color-foreground-dark)",borderRadius:0}}>{children}</div>}
