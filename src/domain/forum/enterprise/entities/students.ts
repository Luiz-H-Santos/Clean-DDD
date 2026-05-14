import { Entity } from '@/core/entities/entity.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface StudentsProps {
  id: UniqueEntityId
  name: string
}

export class Students extends Entity<StudentsProps> {
  static create(props: StudentsProps, id?: UniqueEntityId) {
    const student = new Students(props, id)

    return student
  }
}
