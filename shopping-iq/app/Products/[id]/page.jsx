import ProductView from "@/pages/Products/ProductView"

export const metadata = {
  title: 'Product'
}

const page = () => {
  return (
    <>
      <div>
        <ProductView />
      </div>
    </>
  )
}
export default page;