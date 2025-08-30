'use client'

import { useState, useEffect } from 'react'
import type Document from './types/Document'
import DocumentCard from './components/DocumentCard/DocumentCard'
import Selector from './components/Selector/Selector'
import { filterAndSortDocuments } from './utils/filterAndSortDocuments'

export default function KnowledgeBase() {
	const [documents, setDocuments] = useState<Document[]>([])
	const [filteredDocs, setFilteredDocs] = useState<Document[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<string>('title')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchDocuments()
	}, [])

	useEffect(() => {
		setFilteredDocs(
			filterAndSortDocuments(documents, {
				searchTerm,
				selectedCategory,
				selectedTags,
				sortBy,
			})
		)
	}, [searchTerm, selectedCategory, selectedTags, sortBy, documents])

	const fetchDocuments = async () => {
		setLoading(true)
		const mockDocs: Document[] = [
			{
				id: '1',
				title: 'API Documentation',
				content: 'Complete API reference for Hakutaku platform',
				category: 'api',
				tags: ['api', 'reference', 'backend'],
				createdAt: '2024-01-15',
				author: 'João Silva',
			},
			{
				id: '2',
				title: 'User Guide',
				content: 'How to use Hakutaku knowledge management system',
				category: 'docs',
				tags: ['guide', 'tutorial', 'frontend'],
				createdAt: '2024-01-20',
				author: 'Maria Santos',
			},
			{
				id: '3',
				title: 'Architecture Overview',
				content: 'System architecture and design patterns',
				category: 'wiki',
				tags: ['architecture', 'design', 'system'],
				createdAt: '2024-01-10',
				author: 'Pedro Costa',
			},
		]
		setDocuments(mockDocs)
		setLoading(false)
	}

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const getAllTags = () => {
		const allTags = documents.flatMap((doc) => doc.tags)
		return [...new Set(allTags)]
	}

	if (loading) {
		return (
			<div className="kb-loading">
				<div>Carregando base de conhecimento...</div>
			</div>
		)
	}

	return (
		<div className="kb-container">
			<h1 className="kb-title">📚 Base de Conhecimento Hakutaku</h1>

			<div className="kb-filters">
				<div className="kb-search">
					<label className="kb-label">Buscar:</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Digite para buscar..."
						className="kb-input"
					/>
				</div>

				<Selector
					title="Selecionar categoria"
					label="Categoria"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					options={[
						{value: "all", label: "Todas"},
						{value: "docs", label: "Documentação"},
						{value: "wiki", label: "Wiki"},
						{value: "api", label: "API"}
					]}
				/>
				<Selector
					title="Ordenar documentos"
					label="Ordernar por"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					options={[
						{value: "title", label: "Título"},
						{value: "date", label: "Data"},
						{value: "author", label: "Autor"}
					]}
				/>
			</div>

			<div className="kb-tags">
				<label className="kb-label">Tags:</label>
				<div className="kb-tags-list">
					{getAllTags().map((tag) => (
						<button
							key={tag}
							onClick={() => handleTagToggle(tag)}
							className={`kb-tag-btn${selectedTags.includes(tag) ? ' selected' : ''}`}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			<div className="kb-doc-count">
				<strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
			</div>

			<div className="kb-documents">
				{filteredDocs.map((doc) => (
					<DocumentCard key={doc.id} doc={doc} />
				))}
			</div>

			{filteredDocs.length === 0 && (
				<div className="kb-empty">
					<h3>Nenhum documento encontrado</h3>
					<p>Tente ajustar os filtros de busca</p>
				</div>
			)}
		</div>
	)
}
