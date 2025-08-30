import Document from "@/app/types/Document";
import formatDate from "@/app/utils/formatDate";
import getCategoryColor from "@/app/utils/getCategoryColor";

interface DocumentProps {
    doc: Document
}

const DocumentCard: React.FC<DocumentProps> = ({ doc }) => {
    return(
        <div key={doc.id} className="kb-doc-card">
            <div className="kb-doc-header">
                <h3 className="kb-doc-title">{doc.title}</h3>
                <span
                    className="kb-doc-category"
                    style={{ backgroundColor: getCategoryColor(doc.category) }}
                >
                    {doc.category.toUpperCase()}
                </span>
            </div>

            <p className="kb-doc-content">{doc.content}</p>

            <div className="kb-doc-tags">
                {doc.tags.map((tag) => (
                    <span
                        key={tag}
                        className="kb-doc-tag"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="kb-doc-footer">
                <span>
                    Por: <strong>{doc.author}</strong>
                </span>
                <span>{formatDate(doc.createdAt)}</span>
            </div>
        </div>
    );
}

export default DocumentCard;
