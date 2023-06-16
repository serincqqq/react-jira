import React, { useState, useEffect, Fragment } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Button } from 'antd'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
function DesEditor() {
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('<p>hello</p>')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      // setHtml(
      //   `<p></p><p style="text-align: left;">An issue's status indicates its current place in the project's workflow. Here's a list of the statuses that come with JIRA products, depending on what projects you've created on your site.</p><p style="text-align: left;"><br></p><h3 style="text-align: left;">Jira software issue statuses:</h3><p style="text-align: left;"><br></p><h2 style="text-align: left;"><span style="background-color: rgb(187, 187, 187);"><strong> Backlog </strong></span></h2><p style="text-align: left;">The issue is waiting to be picked up in a future sprint.</p><p style="text-align: left;"><br></p><h2 style="text-align: left;"><span style="background-color: rgb(187, 187, 187);"><strong> Selected </strong></span></h2><p style="text-align: left;">The issue is open and ready for the assignee to start work on it.</p><p style="text-align: left;"><br></p><h2 style="text-align: left;"><span style="color: rgb(255, 255, 255); background-color: rgb(0, 102, 204);"><strong> In Progress </strong></span></h2><p style="text-align: left;">This issue is being actively worked on at the moment by the assignee.</p><p style="text-align: left;"><br></p><h2 style="text-align: left;"><span style="color: rgb(255, 255, 255); background-color: rgb(0, 138, 0);"><strong> Done </strong></span></h2><p style="text-align: left;">Work has finished on the issue.</p><p><br></p>`
      // )
      setHtml('<p>hello</p>')
    }, 1500)
  }, [])

  const toolbarConfig = {
    toolbarKeys: ['headerSelect', 'blockquote', 'bold', 'italic', 'through', 'underline', '|', 'color', 'bgColor', 'clearStyle', 'todo', '|', 'bulletedList', 'numberedList', 'codeBlock'],
  }
  const editorConfig = {
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  const save = () => {
    setIsVisible(true)
    //有接口后需要在这里向接口发送内容保存
  }
  return (
    <>
      {!isVisible ? (
        <div>
          <div style={{ border: '1px solid #ccc', zIndex: 100, margin: '15px 0px' }}>
            <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="simple" style={{ borderBottom: '1px solid #ccc' }} />
            <Editor defaultConfig={editorConfig} value={html} onCreated={setEditor} onChange={(editor) => setHtml(editor.getHtml())} mode="default" />
          </div>
          <Button onClick={save} type="primary" style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button onClick={() => setIsVisible(true)}>Cancel</Button>
        </div>
      ) : null}

      {isVisible ? <div onClick={() => setIsVisible(false)} dangerouslySetInnerHTML={{ __html: html }} /> : null}
    </>
  )
}

export default DesEditor
