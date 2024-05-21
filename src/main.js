// import './assets/layout/styles/layout/_config.scss'
// import './assets/layout/styles/layout/_content.scss'
// import './assets/layout/styles/layout/_footer.scss'
// import './assets/layout/styles/layout/_main.scss'
// import './assets/layout/styles/layout/_menu.scss'
// import './assets/layout/styles/layout/_mixins.scss'
// import './assets/layout/styles/layout/_preloading.scss'
// import './assets/layout/styles/layout/_responsive.scss'
// import './assets/layout/styles/layout/_topbar.scss'
// import './assets/layout/styles/layout/_typography.scss'
// import './assets/layout/styles/layout/_utils.scss'
// import './assets/layout/styles/layout/layout.scss'

// import './assets/demo/styles/flags/flags.css'
// import './assets/demo/styles/badges.scss'
// import './assets/demo/styles/items.scss'

import './assets/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios' //
import VueAxios from 'vue-axios' //
// import Cookies from 'js-cookie'

import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

// VeeValidate
import { Field, Form, ErrorMessage, configure, defineRule } from 'vee-validate'
import * as AllRules from '@vee-validate/rules/dist/vee-validate-rules.esm'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'
import Panel from 'primevue/panel'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import Inplace from 'primevue/inplace'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Editor from 'primevue/editor'
import Chips from 'primevue/chips'
import Tooltip from 'primevue/tooltip'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row'
import Sidebar from 'primevue/sidebar'
import InputNumber from 'primevue/inputnumber'
import InputMask from 'primevue/inputmask'
import Calendar from 'primevue/calendar'
import InputSwitch from 'primevue/inputswitch'
import Breadcrumb from 'primevue/breadcrumb'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import TriStateCheckbox from 'primevue/tristatecheckbox'
import ConfirmationService from 'primevue/confirmationservice'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize('zh_TW', {
    messages: {
      required: '此欄位為必填'
    }
  }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)

app.use(PrimeVue)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios) //
app.use(ConfirmationService)

app.component('Panel', Panel)
app.component('Toolbar', Toolbar)
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('AutoComplete', AutoComplete)
app.component('Card', Card)
app.component('Tag', Tag)
app.component('Dialog', Dialog)
app.component('Inplace', Inplace)
app.component('InputText', InputText)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Editor', Editor)
app.component('Chips', Chips)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Sidebar', Sidebar)
app.component('InputNumber', InputNumber)
app.component('InputMask', InputMask)
app.component('Calendar', Calendar)
app.component('InputSwitch', InputSwitch)
app.component('Breadcrumb', Breadcrumb)
app.component('Password ', Password)
app.component('Checkbox ', Checkbox)
app.component('TriStateCheckbox  ', TriStateCheckbox)
app.component('Toast  ', Toast)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.component('Field', Field)
app.component('Form', Form)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
