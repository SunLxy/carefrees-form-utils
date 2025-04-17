
/**公共属性*/
import { createContext, useContext } from "react"

interface AttrOptions {

}

/**表单项实例 Context */
export const AttrContext = createContext({})

/**子项中获取表单项实例*/
export const useAttr = () => useContext(AttrContext)

