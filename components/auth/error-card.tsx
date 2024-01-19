import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import CardWrapper from "./card-wrapper"

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Go back to login"
    >
      <div className="w-full flex items-center justify-center text-destructive">
        <ExclamationTriangleIcon />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
