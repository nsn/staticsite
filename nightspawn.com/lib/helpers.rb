include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Rendering

def create_tag_pages
  tag_set(items).each do |tag|
    item = Nanoc3::Item.new(
      #"= render('_tag_page', :tag => '#{tag}')",           # use locals to pass data
      render('_tag_page', :tag => tag),           # use locals to pass data
      { :title => "tag: #{tag}", :hidden => true}, # do not include in aside
      "/rants/tags/#{tag}/",                               # identifier
      :binary => false
    )
    items << item
  end
end


def tag_set(items=nil)
  items = @items if items.nil?
  tags = Set.new
  items.each do |item|
    next if item[:tags].nil?
    item[:tags].each { |tag| tags << tag }
  end
  tags.to_a
end

def items_for_tag(tag)
  tagitems = Set.new
  items.each do |i|
    next if i[:tags].nil?
    if !i[:tags].detect{|t| t == tag}.nil?
      tagitems << i
    end
  end
  tagitems.to_a
end

def item_for_id(id) 
  items.detect{ |itm| itm[:identifier] == id }
end

# Copy static assets outside of content instead of having nanoc3 process them.
def copy_static
  FileUtils.cp_r 'static/.', 'output/'
end

