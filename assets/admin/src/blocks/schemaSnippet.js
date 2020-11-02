/**
 * External dependencies
 */
import { startCase, forEach } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InspectorControls } from '@wordpress/block-editor'
import { ServerSideRender, TextControl } from '@wordpress/components'
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import icon from '@blocks/icon'

/**
 * Register schema snippet block.
 */
export default () => {
	const keywords = [
		__( 'Schema', 'rank-math' ),
		__( 'Markup', 'rank-math' ),
		__( 'Structured Data', 'rank-math' ),
		__( 'Rich Snippet', 'rank-math' ),
		__( 'SEO', 'rank-math' ),
		__( 'Rank Math', 'rank-math' ),
		__( 'Yoast', 'rank-math' ),
	]

	registerBlockType( 'rank-math/rich-snippet', {
		title: __( 'Schema by Rank Math', 'rank-math' ),
		description: __(
			'Add the Schema generated by Rank Math anywhere on your page using this Block.',
			'rank-math'
		),
		category: 'rank-math-blocks',
		icon,
		keywords,
		attributes: applyFilters(
			'rank_math_block_schema_attributes',
			{
				post_id: { default: rankMath.objectID },
			}
		),
		edit: ( props ) => {
			const { setAttributes, attributes } = props
			const controllers = []
			forEach( attributes, ( attribute, slug ) => {
				if ( 'post_id' === slug ) {
					controllers.push(
						<TextControl
							key={ slug }
							label={ __( startCase( slug ), 'rank-math' ) }
							value={ attributes[ slug ] }
							type="number"
							min={ 1 }
							step={ 1 }
							onChange={ ( newID ) => {
								const attrs = {}
								attrs[ slug ] = newID ? newID : rankMath.objectID
								setAttributes( attrs )
							} }
						/>
					)
					return
				}

				controllers.push(
					<TextControl
						key={ slug }
						label={ __( startCase( slug ), 'rank-math' ) }
						value={ attributes[ slug ] }
						type="string"
						onChange={ ( nextID ) => {
							const attrs = {}
							attrs[ slug ] = nextID
							setAttributes( attrs )
						} }
					/>
				)
			} )

			return (
				<div>
					<InspectorControls key={ 'inspector' }>
						{ controllers }
					</InspectorControls>

					<ServerSideRender
						block="rank-math/rich-snippet"
						attributes={ attributes }
					/>
				</div>
			)
		},
	} )
}
