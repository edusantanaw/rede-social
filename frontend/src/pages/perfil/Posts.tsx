import Lista from '../../components/posts/Posts'

export const Posts = ({id, depence}: {id: string, depence?: any}) => {
  return (
    <div>
        <Lista url={`/posts/user/${id}`}  depence= {depence}/>
    </div>
  )
}
