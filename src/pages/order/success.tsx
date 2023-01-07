import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { SuccessPage } from "../../templates/Success";

type OrderSuccessProps = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function OrderSuccess(props: OrderSuccessProps) {
  return (
    <SuccessPage {...props} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const sessionId = query.session_id as string;

  if(!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });
  
  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product; 

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }
}