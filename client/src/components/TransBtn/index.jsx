import { TranslationOutlined } from '@ant-design/icons'
import i18n from 'i18next'
import './style.css'
export default function TransBtn() {
  return (
    <TranslationOutlined
      className="trans"
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
    />
  )
}
