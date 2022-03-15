import { useEffect } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Login() {
	// const { data: session } = useSession()
	// const router = useRouter()
	// useEffect(() => {
	// 	if (session) router.push("/tasks")
	// }, [session])

	return (
		<div>
			<button onClick={() => signIn()}>Login with</button>
			<button onClick={() => signIn("github")}>Login with Github</button>
			<button onClick={() => signIn("discord")}>Login with Discord</button>
			<button onClick={() => signIn("google")}>Login with Google</button>
			<button onClick={() => signIn("facebook")}>Login with Facebook</button>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	// const session = await fetch("http://localhost:3333" + "/api/auth/session", {
	// 	headers: {
	// 		cookie: context.req.headers.cookie,
	// 	}
	// }).then(res => res.json())
	// console.log({ session })
	if (!session) return { props: {} }
	return {
		redirect: {
			destination: "/tasks"
		}
	}
}

export default Login