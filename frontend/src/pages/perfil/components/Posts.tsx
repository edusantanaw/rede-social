import Lista from '../../../components/posts/Posts'

export const Posts = ({id, depence}: {id: string, depence?: boolean}) => {
  return (
    <div>
        <Lista url={`/posts/user/${id}`}  depence= {depence}/>
    </div>
  )
}
