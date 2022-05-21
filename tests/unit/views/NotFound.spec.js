import { mount } from '@vue/test-utils'
import NotFound from '@/views/NotFound.vue'

describe("NotFound.vue", () => {
    it("Ispisuje poruku da ne postoji određeni put", () => {
        const mockRoute = {
            params: {
              id: 1
            }
        }
        const wrapper = mount(NotFound, {
            global: {
                mocks: {
                    $route: mockRoute
                }
            }
        })
        expect(wrapper.text()).toContain("Sorry,  is not found")
    })
})