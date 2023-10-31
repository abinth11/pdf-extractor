import AuthBackGround from '../../components/background/AuthBackGround'
import SignInFormParent from '../../components/forms/SignInFormParent'

type Props = {}

function SignInPage({}: Props) {
  return (
    <AuthBackGround  sideImg='auth1.svg'>
    <SignInFormParent />
  </AuthBackGround>  ) 
}

export default SignInPage