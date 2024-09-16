type Selector<StoreProps, StoreState> = (state: StoreProps) => StoreState

type DevtoolsMiddleware = ['zustand/devtools', never]
type PersistMiddleware<T> = ['zustand/persist', T]
type ImmerMiddleware<T> = ['zustand/immer', T]

export type { DevtoolsMiddleware, ImmerMiddleware, PersistMiddleware, Selector }
