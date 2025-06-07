// src/pages/TagsPage.jsx
import { useSelector } from 'react-redux';

export default function TagsViewModal() {
  const tags = useSelector((state) => Object.values(state.tags || {}));

  return (
    <div className="tags-page">
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}
