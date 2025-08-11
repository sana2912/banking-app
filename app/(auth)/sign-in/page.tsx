import Form_component from "@/components/form_component"
import { getLoggedInUser } from "@/lib/server/user_actions";

async function Sign_in() {
    const user = await getLoggedInUser();
    console.log(user);
    return (
        <section className="flex-center mx-auto mt-20 w-100">
            <Form_component
                auth={'sign in'}
            />
        </section>
    )
}
export default Sign_in