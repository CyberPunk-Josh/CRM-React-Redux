import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { store } from "./store/store"
import { AppTheme } from "./theme"

export const CRM = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppTheme>
            <AppRouter />
        </AppTheme>
      </BrowserRouter>
    </Provider>
  )
}
