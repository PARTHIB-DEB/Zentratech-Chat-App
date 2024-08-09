interface input_props{
    width:string,
    padding:string,
    small_text_weight:string,
    large_text_weight:string,
}
let input_obj : input_props={
    width : "w-[90%]",
    padding : "p-[0.2rem]",
    small_text_weight : "text-base",
    large_text_weight : "md:text-lg"
}
export default function Login (){
    const props_stack = `${input_obj.width}${input_obj.padding}${input_obj.small_text_weight}${input_obj.large_text_weight}`
  return (
    <div className="user-form h-1/2 w-1/2 font-normal rounded-lg flex flex-col justify-evenly items-center bg-white shadow-purple-400 shadow-md">
        <p className="text-center flex justify-center text-2xl md:text-4xl underline">Login User</p>
        <div className="username flex justify-center items-center">
            <label htmlFor="username" className="text-xl md:text-2xl">Username</label>
            <input type="text" name="username" id="username" className={props_stack} placeholder="Enter Your Username"/>
        </div>
        <div className="password1 flex justify-center items-center">
            <label htmlFor="password1" className="text-xl md:text-2xl"></label>
            <input type="text" name="password1" id="password1" className="{props_stack}" placeholder="Enter Your Password"/>
        </div>
    </div>
  )
}
