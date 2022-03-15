import React from 'react'
import { Button } from "@nextui-org/react"
import { signOut } from 'next-auth/react'

function Navbar() {
	return (
		<>
			<div className="navbar">
				<div>
					<Button auto onClick={() => signOut()}>Log out</Button>
				</div>
			</div>

			<style jsx>{`
				.navbar{
					display: flex;
					justify-content: end;
					padding: 8px 10px;
				}
			`}
			</style>
		</>
	)
}

export default Navbar