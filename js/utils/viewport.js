
export function setViewportResize($el){
   const viewportBlockSize = getViewport()
   $el.style.blockSize = `${viewportBlockSize}px`
}

export function getViewport(){
   return window.innerHeight
}

export function onViewportResize(callback){
   window.addEventListener('resize', callback)
}

export function offViewportResize(callback) {
   window.removeEventListener('resize', callback)
}

export function viewportSize($el){

   setViewportResize($el)
   onViewportResize(() => setViewportResize($el))

}