var React = require('react/addons')
var moment = require('moment')

var CodeViewer = require('../Components/CodeViewer')

var CodeEditModal = require('../Components/CodeEditModal')
var CodeDeleteModal = require('../Components/CodeDeleteModal')
var NoteEditModal = require('../Components/NoteEditModal')
var NoteDeleteModal = require('../Components/NoteDeleteModal')
var MarkdownPreview = require('../Components/MarkdownPreview')

var Modal = require('../Mixins/Modal')
var ForceUpdate = require('../Mixins/ForceUpdate')

module.exports = React.createClass({
  mixins: [ForceUpdate(60000), Modal],
  propTypes: {
    article: React.PropTypes.object,
    showOnlyWithTag: React.PropTypes.func,
    planet: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      isEditModalOpen: false
    }
  },
  openEditModal: function () {
    switch (this.props.article.type) {
      case 'code' :
        this.openModal(CodeEditModal, {code: this.props.article, planet: this.props.planet})
        break
      case 'note' :
        this.openModal(NoteEditModal, {note: this.props.article, planet: this.props.planet})
    }
  },
  openDeleteModal: function () {
    switch (this.props.article.type) {
      case 'code' :
        this.openModal(CodeDeleteModal, {code: this.props.article, planet: this.props.planet})
        break
      case 'note' :
        this.openModal(NoteDeleteModal, {note: this.props.article, planet: this.props.planet})
    }
  },
  render: function () {
    var article = this.props.article
    if (article == null) {
      return (
        <div className='PlanetArticleDetail'>
          Nothing selected
        </div>
      )
    }
    var tags = article.Tags.length > 0 ? article.Tags.map(function (tag) {
      return (
        <a onClick={this.props.showOnlyWithTag(tag.name)} key={tag.id}>#{tag.name}</a>
      )
    }.bind(this)) : (
      <a className='noTag'>Not tagged yet</a>
    )
    if (article.type === 'code') {
      return (
        <div className='PlanetArticleDetail codeDetail'>
          <div className='viewer-header'>
            <i className='fa fa-code fa-fw'></i> {article.callSign} <small className='updatedAt'>{moment(article.updatedAt).fromNow()}</small>
            <span className='control-group'>
              <button onClick={this.openEditModal} className='btn-default btn-square btn-sm'><i className='fa fa-edit fa-fw'></i></button>
              <button onClick={this.openDeleteModal} className='btn-default btn-square btn-sm'><i className='fa fa-trash fa-fw'></i></button>
            </span>
          </div>
          <div className='viewer-body'>
            <div className='viewer-detail'>
              <div className='description'>{article.description}</div>
              <div className='tags'><i className='fa fa-tags'/>{tags}</div>
            </div>
            <div className='content'>
              <CodeViewer code={article.content} mode={article.mode}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='PlanetArticleDetail noteDetail'>
        <div className='viewer-header'>
          <i className='fa fa-file-text-o fa-fw'></i> {article.title} <small className='updatedAt'>{moment(article.updatedAt).fromNow()}</small>
          <span className='control-group'>
            <button onClick={this.openEditModal} className='btn-default btn-square btn-sm'><i className='fa fa-edit fa-fw'></i></button>
            <button onClick={this.openDeleteModal} className='btn-default btn-square btn-sm'><i className='fa fa-trash fa-fw'></i></button>
          </span>
        </div>
        <div className='viewer-body'>
          <div className='tags'><i className='fa fa-tags'/>{tags}</div>
          <MarkdownPreview className='content' content={article.content}/>
        </div>
      </div>
    )
  }
})