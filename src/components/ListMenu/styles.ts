const defaultStylesComponent = {
    nav: 'listMenu w-full flex flex-col',
    container: 'min-w-64 h-full border-r border-zinc-200',
    h1: 'select-none text-2xl font-bold text-blue-600 px-6 py-8',
    ul: 'w-full flex flex-col gap-1 mt-2',
    li: 'flex items-center ml-[12px] mr-[12px] rounded-md py-[12px] px-[16px] transition-all duration-200 hover:bg-zinc-100',
    liFocus: 'select-none bg-[#DBEAFE] font-semibold text-[#4646FA]',
    liFinance: 'ml-[36px] py-[8px] px-[16px]',
    liFinanceFocus: {
        entrada: 'bg-[#DCFCE7] font-semibold text-[#15803D]',
        saida: 'bg-[#FEE2E2] font-semibold text-[#B91C1C]'
    },
    button: 'select-none cursor-pointer flex items-center gap-2 justify-center text-sm text-[#B91C1C] font-semibold border border-zinc-200 rounded-md ml-7 mr-7 mt-6 p-2.5'
}

export default defaultStylesComponent;