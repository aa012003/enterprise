<script setup>
import { Form as ValidationForm, Field } from 'vee-validate'

const onSubmit = (values) => {
  console.log(values)
}
</script>
<template>
  <div class="wrap">
    <h1 class="title">新拖延運動報名表單</h1>
    <div class="info date">活動日期：2020/12/10 ~ 2020/12/11</div>
    <div class="info address">活動地點：台北市大安區新生南路二段1號</div>
    <p class="info text-red">*必填</p>
    <validation-form @submit="onSubmit" class="form" v-slot="{ errors }">
      <div class="form-group" :class="{ error: errors.nickname }">
        <label for="nickname" class="form-group__text required">暱稱</label>
        <field
          type="text"
          name="nickname"
          id="nickname"
          class="form-group__input"
          placeholder="您的回答"
          rules="required|alpha_dash"
        />
        <div class="error__label">{{ errors.nickname }}</div>
      </div>
      <div class="form-group" :class="{ error: errors.email }">
        <label for="email" class="form-group__text required">電子郵件</label>
        <field
          type="email"
          name="email"
          id="email"
          class="form-group__input"
          placeholder="您的電子郵件"
          rules="required|email"
        />
        <div class="error__label">{{ errors.email }}</div>
      </div>
      <div class="form-group" :class="{ error: errors.phone }">
        <label for="phone" class="form-group__text required">手機號碼</label>
        <field
          type="tel"
          name="phone"
          id="phone"
          class="form-group__input"
          placeholder="您的手機號碼"
          rules="required|numeric"
        />
        <div class="error__label">{{ errors.phone }}</div>
      </div>
      <div class="form-group" :class="{ error: errors.type }">
        <div class="form-group__text required">報名類型</div>
        <div class="input-group">
          <field
            type="radio"
            name="type"
            id="option1"
            value="躺在床上用想像力實作"
            class="inputGtoup__radio"
            rules="required"
          /><label for="option1" class="input-group__label">躺在床上用想像力實作</label>
        </div>
        <div class="input-group">
          <field
            type="radio"
            name="type"
            id="option2"
            value="趴在地上滑手機找現成的"
            class="input-group__radio"
            rules="required"
          /><label for="option2" class="input-group__label"> 趴在地上滑手機找現成的</label>
        </div>
        <div class="error__label">{{ errors.type }}</div>
      </div>
      <div class="form-group" :class="{ error: errors.media }">
        <label for="media" class="form-group__text required">怎麼知道這個活動的？</label>
        <field
          as="select"
          type="text"
          name="media"
          id="media"
          class="form-group__input"
          placeholder="您的回答"
          rules="required"
        >
          <option value="網路查詢">網路查詢</option>
          <option value="朋友介紹">朋友介紹</option>
          <option value="路過">路過</option>
        </field>
        <div class="error__label">{{ errors.media }}</div>
      </div>
      <div class="form-group" :class="{ error: errors.other }">
        <label for="other" class="form-group__text">其他</label>
        <div class="form-group__desc">對活動的一些建議</div>
        <field
          as="textarea"
          name="other"
          id="other"
          class="form-group__input"
          placeholder="您的回答"
          rules="max:100"
        />
        <div class="error__label">{{ errors.other }}</div>
      </div>
      <input class="btn submit" type="submit" value="提交" />
      <p class="info">請勿透過表單送出您的密碼。</p>
    </validation-form>
  </div>
  <footer class="footer">© 2020 © Copyright. All rights Reserved.</footer>
</template>

<style>
*,
::after,
::before {
  /* border: solid 1px black;  */
  box-sizing: border-box;
  position: relative;
}
html,
body {
  width: 100%;
  padding: 0px;
  margin: 0px;
  line-height: 1.5;
  font-family: 'PingFang', 'Questrial', sans-serif, 'Microsoft JhengHei';
  color: #4b4d50;
  font-size: 14px;
  background-color: #f3f3f3;
}
a {
  text-decoration: none;
  color: #5ea55c;
}
a:hover {
  text-decoration: underline;
}
p {
  margin: 0px;
}
input[type='radio'],
input[type='checkbox'] {
  margin: 0;
  margin-right: 5px;
}
.text-red {
  color: #dc4f59 !important;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.text-center {
  text-align: center;
}
.wrap {
  max-width: 550px;
  width: 90%;
  margin: 40px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(18, 46, 123, 0.1);
  padding: 45px 50px;
}
.title {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 2em;
}
.title::before {
  content: '';
  position: absolute;
  width: 8%;
  height: 4px;
  border-radius: 5px;
  background-color: #507efa;
  top: -10px;
}
.info {
  line-height: 1.5;
  color: #6c6c6c;
  /* font-size: .9em; */
}
.form {
  padding-top: 20px;
}
.form-group {
  padding: 10px 0px 30px;
}
.form-group.error .error__label {
  display: block;
}
.form-group.error .form-group__input {
  border-color: #dc4f59;
}
.form-group.error .form-group__input:focus {
  border-color: #dc4f59;
  box-shadow: 0px 0px 0px 2px rgba(220, 79, 89, 0.2);
}
.form-group__text,
.form-group__input {
  display: block;
  width: 100%;
}
.form-group__text {
  padding: 8px 0px;
}
.form-group__text.required::after {
  content: '*';
  color: #dc4f59;
  padding: 0px 5px;
}
.form-group__input {
  border: 1px solid #b3b9c9;
  padding: 10px;
  border-radius: 3px;
  min-height: 40px;
}
.form-group__desc {
  font-size: 0.8em;
  margin-top: -6px;
  margin-bottom: 8px;
  color: #6c6c6c;
}
.form-group__input:focus {
  border: 1px solid #507efa;
  box-shadow: 0px 0px 0px 2px rgba(13, 61, 193, 0.2);
  outline: none;
}
.error__label {
  padding: 10px 0px;
  color: #dc4f59;
  font-size: 0.9em;
  display: none;
  position: absolute;
}
.error__label::before {
  content: '!';
  display: inline-block;
  border: 1px solid #dc4f59;
  width: 19px;
  height: 19px;
  text-align: center;
  border-radius: 50%;
  margin-right: 3px;
  transform: scale(0.8);
}
.input-group {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 5px 0px;
}
.input-group__label {
  line-height: 1;
}
.input-group__radio:focus {
  outline: none;
}
.btn {
  padding: 0.4em 1em;
  border-width: 0px;
  background-color: #507efa;
  color: #fff;
  border-radius: 0.2em;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover {
  background-color: #3e70fa;
}
input[type='submit'] {
  margin-top: 40px;
  margin-bottom: 10px;
}
.footer {
  text-align: center;
  padding: 20px;
}
@media (max-width: 767px) {
  .wrap {
    padding: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
