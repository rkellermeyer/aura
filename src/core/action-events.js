import channel from './channel';

let documentOverflow = '';
channel.subscribe('document-overflow', (value) => {
  documentOverflow = value || '';
  setDocumentOverflow(documentOverflow);
})


export function setDocumentOverflow(overflow) {
  requestAnimationFrame(()=> {
    document.documentElement.css({overflow});
  })
}
