import React from "react";
export function BrandButton({children,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button {...props} style={{border:"1px solid var(--tamver-border-hairline)",borderRadius:0,background:"transparent",color:"var(--tamver-color-foreground-dark)",padding:"12px 18px",letterSpacing:".14em",textTransform:"uppercase"}}>{children}</button>}
