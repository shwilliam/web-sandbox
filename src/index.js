window.addEventListener('DOMContentLoaded', () => {
  const EDITOR_DEBOUNCE = 2000

  const executeJS = () => {
    console.log('js')
    script.type = 'text/javascript'
    script.innerHTML = editorJS.innerText
    editorJS.parentNode.insertBefore(script, editorJS)
  }

  const rerenderHTML = () => {
    preview.innerHTML = editorHTML.value
  }

  // update preview
  let timer
  ;[editorHTML, editorJS].forEach(editor =>
    editor.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
        timer = 0
      }

      timer = setTimeout(() => {
        rerenderHTML()
        requestAnimationFrame(executeJS)
      }, EDITOR_DEBOUNCE)
    }),
  )

  // editor toggle
  editorToggle.addEventListener('click', () => {
    editor.dataset.state = editor.dataset.state === 'CLOSED' ? 'OPEN' : 'CLOSED'
  })

  // init
  editorHTML.innerText = '<h1>Welcome</h1>'
  editorJS.innerText = "console.log('👋')"

  rerenderHTML()
  requestAnimationFrame(executeJS)
})
