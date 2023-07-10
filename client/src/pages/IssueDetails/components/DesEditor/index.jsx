import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Button } from 'antd'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Des, Edit, EditContainer } from './Styles'
import { updateIssue } from '@/services'
function DesEditor({ content, issueData }) {
  const [editor, setEditor] = useState(null) // 存储 editor 实例
  const [html, setHtml] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    setHtml(content)
  }, [content])

  const toolbarConfig = {
    toolbarKeys: [
      'headerSelect',
      'blockquote',
      'bold',
      'italic',
      'through',
      'underline',
      '|',
      'color',
      'bgColor',
      'clearStyle',
      'todo',
      '|',
      'bulletedList',
      'numberedList',
      'codeBlock',
    ],
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
    updateIssue(issueData._id, { ...issueData, description: html })
  }
  return (
    <Des>
      <span>Description</span>
      {!isVisible ? (
        <Edit>
          <EditContainer>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="simple"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
            />
          </EditContainer>
          <Button onClick={save} type="primary" style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button onClick={() => setIsVisible(true)}>Cancel</Button>
        </Edit>
      ) : null}

      {isVisible ? (
        <Edit onClick={() => setIsVisible(false)} dangerouslySetInnerHTML={{ __html: html }} />
      ) : null}
    </Des>
  )
}

export default DesEditor
