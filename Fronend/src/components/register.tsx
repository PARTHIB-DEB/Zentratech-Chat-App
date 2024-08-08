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
export default function Register () {
    const props_stack = `${input_obj.width}${input_obj.padding}${input_obj.small_text_weight}${input_obj.large_text_weight}`
  return (
    <div className="user-form h-1/2 w-1/2 font-normal rounded-lg flex flex-col justify-evenly items-center bg-white shadow-purple-400 shadow-md">
        <p className="text-center flex justify-center text-2xl md:text-4xl underline">Registration{" "}Form</p>
        <div className="username flex justify-center items-center">
            <label htmlFor="username" className="text-xl md:text-2xl">Username : </label>
            <input type="text" name="username" id="username" className={props_stack} placeholder="Enter Your Username"/>
        </div>
        <div className="email flex justify-center items-center">
            <label htmlFor="email" className="text-xl md:text-2xl">Email : </label>
            <input type="text" name="email" id="email" className="{props_stack}" placeholder="Enter Your Email"/>
        </div>
        <div className="first_name flex justify-center items-center">
            <label htmlFor="first_name" className="text-xl md:text-2xl">First-Name : </label>
            <input type="text" name="first_name" id="first_name" className="{props_stack}" placeholder="Enter Your First-name"/>
        </div>
        <div className="last_name flex justify-center items-center">
            <label htmlFor="last_name" className="text-xl md:text-2xl">Last-Name : </label>
            <input type="text" name="last_name" id="last_name" className="{props_stack}" placeholder="Enter Your Last-name"/>
        </div>
        <div className="password1 flex justify-center items-center">
            <label htmlFor="password1" className="text-xl md:text-2xl">Password : </label>
            <input type="text" name="password1" id="password1" className="{props_stack}" placeholder="Enter Your Password"/>
        </div>
        <div className="password2 flex justify-center items-center">
            <label htmlFor="password2" className="text-xl md:text-2xl">Confirm-Password : </label>
            <input type="text" name="password2" id="password2" className="{props_stack}" placeholder="Confirm Password"/>
        </div>
    </div>
  )
}
