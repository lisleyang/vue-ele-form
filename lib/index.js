import Vue from 'vue'
import locale from './locale'
import EleForm from './EleForm'
import formMixin from './mixins/formMixin'
import uploadMixin from './mixins/uploadMixin'
import EleFormGroup from './EleFormGroup'
import EleFormDialog from './EleFormDialog'
import EleFormSection from './EleFormSection'
import EleFormTag from './components/EleFormTag'
import EleFormWeek from './components/EleFormWeek'
import EleFormTime from './components/EleFormTime'
import EleFormText from './components/EleFormText'
import EleFormDate from './components/EleFormDate'
import EleFormYear from './components/EleFormYear'
import EleFormRate from './components/EleFormRate'
import EleFormColor from './components/EleFormColor'
import EleFormDates from './components/EleFormDates'
import EleFormImage from './components/EleFormImage'
import EleFormInput from './components/EleFormInput'
import EleFormMonth from './components/EleFormMonth'
import EleFormYesno from './components/EleFormYesno'
import EleFormRadio from './components/EleFormRadio'
import EleFormSlider from './components/EleFormSlider'
import EleFormSelect from './components/EleFormSelect'
import EleFormButton from './components/EleFormButton'
import EleFormNumber from './components/EleFormNumber'
import EleFormSwitch from './components/EleFormSwitch'
import EleFormTextarea from './components/EleFormTextarea'
import EleFormCascader from './components/EleFormCascader'
import EleFormDatetime from './components/EleFormDatetime'
import EleFormTransfer from './components/EleFormTransfer'
import EleFormPassword from './components/EleFormPassword'
import EleFormCheckbox from './components/EleFormCheckbox'
import EleFormDaterange from './components/EleFormDaterange'
import EleFormTimerange from './components/EleFormTimerange'
import EleFormMonthrange from './components/EleFormMonthrange'
import EleFormRadioButton from './components/EleFormRadioButton'
import EleFormAutocomplete from './components/EleFormAutocomplete'
import EleFormCascaderPanel from './components/EleFormCascaderPanel'
import EleFormDatetimerange from './components/EleFormDatetimerange'
import EleFormCheckboxButton from './components/EleFormCheckboxButton'

const components = [
  EleForm,
  EleFormGroup,
  EleFormDialog,
  EleFormSection,
  EleFormTag,
  EleFormWeek,
  EleFormTime,
  EleFormText,
  EleFormDate,
  EleFormYear,
  EleFormRate,
  EleFormColor,
  EleFormDates,
  EleFormImage,
  EleFormInput,
  EleFormMonth,
  EleFormYesno,
  EleFormRadio,
  EleFormSlider,
  EleFormSelect,
  EleFormButton,
  EleFormNumber,
  EleFormSwitch,
  EleFormTextarea,
  EleFormCascader,
  EleFormDatetime,
  EleFormTransfer,
  EleFormPassword,
  EleFormCheckbox,
  EleFormDaterange,
  EleFormTimerange,
  EleFormMonthrange,
  EleFormRadioButton,
  EleFormAutocomplete,
  EleFormCascaderPanel,
  EleFormDatetimerange,
  EleFormCheckboxButton
]
components.forEach(component => {
  Vue.component(component.name, component)
})

const EleFormBuiltInNames = [
  'tag',
  'week',
  'time',
  'text',
  'date',
  'year',
  'rate',
  'color',
  'dates',
  'image',
  'input',
  'month',
  'yesno',
  'radio',
  'slider',
  'select',
  'button',
  'number',
  'switch',
  'textarea',
  'cascader',
  'datetime',
  'transfer',
  'password',
  'checkbox',
  'daterange',
  'timerange',
  'monthrange',
  'radio-button',
  'autocomplete',
  'cascader-panel',
  'datetimerange',
  'checkbox-button'
]
Vue.prototype.$EleFormBuiltInNames = EleFormBuiltInNames

const install = function (Vue, opts = {}, lang) {
  locale.use(lang)
  Vue.prototype.$EleFormParams = opts
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
EleForm.install = install
EleForm.formMixin = formMixin
EleForm.uploadMixin = uploadMixin
export default EleForm
