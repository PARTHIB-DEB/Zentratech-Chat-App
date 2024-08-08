interface uobj{
    "user":string,
    "receivers":string[]
}
export default async function GetReceiverNames() {
    const respone = await fetch("http://127.0.0.1:8000/api/register",{mode:'cors'})
    const responsearray:uobj =  await respone.json()
    return responsearray
}
