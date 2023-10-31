import AuthBackGround from "../../components/background/AuthBackGround";
import SigUpFormParent from "../../components/forms/SingUpFormParent";
type Props = {};

function SignUpPage({}: Props) {
  return (
    <AuthBackGround reverse sideImg='auth2.svg'>
      <SigUpFormParent />
    </AuthBackGround>
  );
}

export default SignUpPage;
