import { Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";

const DeleteEntity = ({entity}) => {

  const handleSubmit=(e)=>{
    e.preventDefault();
    switch(entity){
      case 'producto':
        console.log(`esto borrará el ${entity}`)
    }
  }

  return (
    <section className='flex items-center flex-col'>
      <form onSubmit={handleSubmit}>
        <Button type="submit" className='bg-red-600 text-white'>Eliminar {entity}</Button>
      </form>
    </section>
  )
}

export default DeleteEntity
