type ColorType = {
  color?: string
}

function EntradaSvg({color = "text-green-600"}: ColorType) {
  return (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-circle-arrow-up mr-3 h-5 w-5 ${color}`} data-lov-id="src/components/Navbar.tsx:104:14" data-lov-name="ArrowUpCircle" data-component-path="src/components/Navbar.tsx" data-component-line="104" data-component-file="Navbar.tsx" data-component-name="ArrowUpCircle" data-component-content="%7B%22className%22%3A%22mr-3%20h-5%20w-5%20text-green-600%22%7D"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path><path d="M12 16V8"></path></svg>
    </>
  )
}

export default EntradaSvg