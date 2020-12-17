import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = resolve => require(['@/components/HelloWorld'],resolve)
const CatchPortal = resolve => require(['@/components/CatchPortal'],resolve)
const FindPassword = resolve => require(['@/components/FindPassword'],resolve)
const Home = resolve => require(['@/components/Home'],resolve)
const HotspotAnalysis = resolve => require(['@/components/HotspotAnalysis'],resolve)
const Login = resolve => require(['@/components/Login'],resolve)
const Message = resolve => require(['@/components/Message'],resolve)
const PersonalPortal = resolve => require(['@/components/PersonalPortal'],resolve)
const Register = resolve => require(['@/components/Register'],resolve)
const rty_test = resolve => require(['@/components/rty_test'], resolve)
const ResearchInstitute = resolve => require(['@/components/ResearchInstitute'],resolve)
const SearchResult = resolve => require(['@/components/SearchResult'],resolve)
const TopBar = resolve => require(['@/components/TopBar'],resolve)
const SearchRecord = resolve => require(['@/components/SearchRecord'],resolve)
const MyCollection = resolve => require(['@/components/MyCollection'],resolve)
const SearchBox = resolve => require(["@/components/SearchBox"],resolve)
const MyConcern = resolve => require(["@/components/MyConcern"],resolve)
const BrowseRecord = resolve => require(["@/components/BrowseRecord"],resolve)
const Administrator = resolve => require(["@/components/Administrator"],resolve)

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/CatchPortal',
      name: 'CatchPortal',
      component: CatchPortal
    },
    {
      path: '/FindPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/HotspotAnalysis',
      name: 'HotspotAnalysis',
      component: HotspotAnalysis
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/PersonalPortal',
      name: 'PersonalPortal',
      component: PersonalPortal
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/rty_test',
      name: 'rty_test',
      component: rty_test
    },
    {
      path: '/ResearchInstitute',
      name: 'ResearchInstitute',
      component: ResearchInstitute
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/TopBar',
      name: 'TopBar',
      component: TopBar
    },
    {
      path: '/MyCollection',
      name: 'MyCollection',
      component: MyCollection
    },
    {
      path: '/SearchRecord',
      name: 'SearchRecord',
      component: SearchRecord
    },
    {
      path: '/SearchBox',
      name: 'SearchBox',
      component: SearchBox
    },
    {
      path: '/MyConcern',
      name: 'MyConcern',
      component: MyConcern
    },
    {
      path: '/BrowseRecord',
      name: 'BrowseRecord',
      component: BrowseRecord
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator
    },
  ]
})
