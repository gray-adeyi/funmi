


export function handleButtonEvents(callable: () => void): (event: MouseEvent | KeyboardEvent) => void{
    return function(event: MouseEvent | KeyboardEvent){
        if(['keydown','keyup'].includes(event.type) && ((event as KeyboardEvent).key !== 'Enter' || (event as KeyboardEvent).key !== ' ')) return;
        callable()
    }
}