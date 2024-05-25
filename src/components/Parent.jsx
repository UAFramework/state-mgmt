import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import Child from './Child';
import { css, cx } from '@emotion/css'

export default function Parent() {

  const theme = useContext(ThemeContext)
  const style = css`
    padding: 5px 15px;
    margin: 5px 0;
    background-color: ${theme.themeName === "dark" ? "#242424" : "#ccc"};
    color: ${theme.themeName === "dark" ? "#ccc" : "#242424"};
  `
  return (
    <>
      <div className={cx(style)}>Parent's theme is: {theme.themeName}</div>
      <Child />
    </>
    
  )
}