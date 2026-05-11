import { randomUUID } from "node:crypto"
import { Entity } from "../../core/entities/entity"


interface  StudentsProps {
   id: string
   name: string
  

  
}

export class Students extends Entity <StudentsProps> {
  
  }