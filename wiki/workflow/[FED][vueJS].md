## App FRONT - Stack

- Launch yarn env (This env doesnt need docker containers)

1.  Check params in .env (in apps/front)
    -> To access page cat,fp... Maybe need to change NAV_URL with prod url

2.  Check node & yarn version (node would be synch with serveurs prod's version) (use NVM = Node Version Manager to change node version)

3.  rm -rf node_modules

4.  Launch yarn

```bash
$ yarn
```

5.  yarn dev

If node-sass error => npm rebuild node-sass

## vueJS

- Launch Nuxt

```bash
# serve with hot reload at localhost:3000
$ yarn run dev
```

- Launch page (eg: storybook)

```bash
$ yarn test
$ yarn run storybook
# OR yarn storybook
```

## Storybook

Storybook is build on : http://localhost:6006/

# How to create a new page

- Create a new vue in "Pages" folder
  => This new vue will be automatically used by "default.vue" (if no layout is requested in).
  => This new vue will be automatically accessible by is name file at the end of url (eg: localhost:3000/path/myNewFolder)

# Structure

- Page => apps/front/pages/mypage.vue
  => The page = That will contains all components

- Components => apps/front/components/mycomponent.vue
  => The component = That will contains content

- JS => apps/front/const/editorial/landing.js
  => The js = Module export (for example)

- Storybook => apps/front/storybook/mycomponent.story.js
  => The storybook = Storybook

## REMINDERS

- {{ text }} => Only for place where we use text not HTML elements

# Directives (Instruction place in the code for vueJs.)

- v-bind = Bind something in our template. Wepaste something in the code. / v-on = listening something. We receive something from our template (cf: event).
- v-bind => Dont use the element has a normal attribute but bind it. v-bind doesnt need {{}} (cf: <a v-bind:href="link">Google</a>)
- v-on => Use for events (click, mouse...) (cf: <button v-on:click="increase">Click me </button>)
- v-once => Get initial value and doesn't change it if update in methods. it render once
- v-html => output html code. It's tell vueJs to render html in code.
