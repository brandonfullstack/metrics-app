import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import PORTALS from '../constants/portals';



export const usePortals = create()(
  persist(
    set => ({
      portals: [],
      setPortal: portal => set(state => {

        const existingPortal = state.portals.find(p => p.name === portal.name);

        if (existingPortal) {
          console.log('existingPortal', existingPortal);
          const updatedPortals = state.portals.filter(p => p.name !== portal.name);
          return {
            portals: updatedPortals
          }
        }
        
        return {
          // spread syntax to copy the state
          portals: [...state.portals , PORTALS.find(p => p.name === portal.name)]
        }
      })
    }),
    {
      name: 'portals-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)