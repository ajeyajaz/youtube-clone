import useCategories from '../hooks/useCategories';
import { useDispatch, useSelector } from "react-redux";
import {setCategory} from '../redux/slices/query.slice';



export default function CategoryList() {
  const {data: categories, error} = useCategories();
  const categoryId = useSelector(state => state.query.category);
  const dispatch = useDispatch();
  

  if(error) return null;
  

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-3 py-2 min-w-max">
        
        {categories.map((item) => (
          <button
            key={item._id}
            onClick={() => dispatch(setCategory(item._id))}
            className={`
              px-4 py-1.5 rounded-lg text-sm whitespace-nowrap
              transition
              ${
                categoryId === item._id
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }
            `}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
