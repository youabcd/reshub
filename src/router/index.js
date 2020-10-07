import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CatchPortal from '@/components/CatchPortal'
import FindPassword from '@/components/FindPassword'
import Home from '@/components/Home'
import HotspotAnalysis from '@/components/HotspotAnalysis'
import Login from '@/components/Login'
import Message from '@/components/Message'
import PersonalPortal from '@/components/PersonalPortal'
import Profession from '@/components/Profession'
import Register from '@/components/Register'
import ResearchInstitute from '@/components/ResearchInstitute'
import SearchResult from '@/components/SearchResult'
import TopBar from '@/components/TopBar'
import SearchRecord from '@/components/SearchRecord'
import MyCollection from '@/components/MyCollection'
import BottomBar from "../components/BottomBar";
import SearchBox from "../components/SearchBox";

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
      path: '/Profession',
      name: 'Profession',
      component: Profession
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
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
      path: '/BottomBar',
      name: 'BottomBar',
      component: BottomBar
    },
    {
      path: '/SearchBox',
      name: 'SearchBox',
      component: SearchBox
    },
  ]
})
