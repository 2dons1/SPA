import { mount  } from '@vue/test-utils'
import Home from '@/views/Home.vue'

const $store = {
    state: {
        user: {
            username: "Dons", 
            uloga: "gost"
        },
    },
    getters: {
        getUser(store){
            return store.username
        },
        getToken(store){
            return store.token
        },
    },

}

describe("Home.vue", () => {
    it("Ispisuje korisničko ime i ulogu ako je korisnik ulogiran, inače ispisuje savijet za login/register", () => {
        const wrapper = mount(Home,  {
            global: {
                mocks: {
                    $store
                }
            }
        })
        const header = wrapper.get('[data-test="header"]')
        expect(header.text()).toBe("Hi user, your username is:  and your role is:")
    })
})