import Form_component from "@/components/form_component"
import { getLoggedInUser } from "@/lib/server/user_actions";
async function Sign_up() {
    const user = await getLoggedInUser();
    return (
        <section className="flex-center mx-auto mt-4 w-100">
            <Form_component
                auth={'sign up'}
            />
        </section>
    )
}
export default Sign_up;