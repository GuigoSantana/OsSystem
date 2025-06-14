const defaultStylesComponent = {
    content: 'flex flex-col w-full px-[32px] py-[32px]',
    header:{
        content: 'flex flex-col gap-2',
        h1: 'text-3xl font-bold',
    },
    cardsContainer: 'flex gap-6 justify-between flex-wrap w-full mt-8',
    card: {
        container:'flex-1 w-64 px-6 py-6 rounded-lg border border-zinc-200 hover:shadow-md transition-all duration-200',
        descriptions: 'flex items-center justify-between pb-2',
        label: 'text-lg font-semibold',
        value: 'text-3xl font-bold',
    },
    graficContainer: 'border-[0.5px] border-zinc-100 pb-20 rounded-xl shadow pt-6 px-6 mt-10',
}

export default defaultStylesComponent;